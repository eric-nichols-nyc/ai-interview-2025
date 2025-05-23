// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { WebhookEvent } from '@clerk/nextjs/server'

// Define types for Clerk webhook data
interface ClerkEmailAddress {
  id: string
  email_address: string
  verification?: {
    status: 'verified' | 'unverified'
  }
}

interface ClerkPhoneNumber {
  id: string
  phone_number: string
  verification?: {
    status: 'verified' | 'unverified'
  }
}

interface ClerkExternalAccount {
  id: string
  provider: string
  provider_user_id: string
  email_address?: string
}

interface ClerkUserData {
  id: string
  email_addresses: ClerkEmailAddress[]
  phone_numbers?: ClerkPhoneNumber[]
  first_name?: string
  last_name?: string
  image_url?: string
  profile_image_url?: string
  username?: string
  external_accounts?: ClerkExternalAccount[]
  primary_email_address_id?: string
  primary_phone_number_id?: string
  last_sign_in_at?: number
  created_at?: number
  updated_at?: number
}

// Supabase user insert type
interface SupabaseUserInsert {
  clerk_id: string
  email: string
  email_verified?: boolean
  first_name?: string
  last_name?: string
  username?: string
  avatar_url?: string
  phone_number?: string
  phone_verified?: boolean
  external_accounts?: ClerkExternalAccount[]
  last_sign_in_at?: string
  created_at?: string
  updated_at?: string
}

// Supabase user update type
interface SupabaseUserUpdate {
  email?: string
  email_verified?: boolean
  first_name?: string
  last_name?: string
  username?: string
  avatar_url?: string
  phone_number?: string
  phone_verified?: boolean
  external_accounts?: ClerkExternalAccount[]
  last_sign_in_at?: string
  updated_at?: string
  status?: string
  deleted_at?: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server-side operations
)

export async function POST(request: NextRequest): Promise<NextResponse> {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  
  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET')
    return NextResponse.json(
      { message: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  const wh = new Webhook(WEBHOOK_SECRET)
  
  // Get the headers
  const svixId = request.headers.get('svix-id')
  const svixTimestamp = request.headers.get('svix-timestamp')
  const svixSignature = request.headers.get('svix-signature')

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { message: 'Missing svix headers' },
      { status: 400 }
    )
  }

  // Get the body as text
  const body = await request.text()

  let evt: WebhookEvent
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return NextResponse.json(
      { message: 'Webhook verification failed' },
      { status: 400 }
    )
  }

  // Handle the webhook
  const { type, data } = evt

  if (type === 'user.created') {
    try {
      const userData = data as ClerkUserData
      const { 
        id, 
        email_addresses, 
        first_name, 
        last_name,
        image_url,
        profile_image_url,
        phone_numbers,
        external_accounts,
        username,
        last_sign_in_at,
        created_at,
        updated_at,
        primary_email_address_id,
        primary_phone_number_id
      } = userData

      // Get primary email
      const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id)
      const email = primaryEmail?.email_address || email_addresses[0]?.email_address

      if (!email) {
        console.error('No email found for user:', id)
        return NextResponse.json(
          { message: 'No email found for user' },
          { status: 400 }
        )
      }

      // Get primary phone (if exists)
      const primaryPhone = phone_numbers?.find(phone => phone.id === primary_phone_number_id)
      const phoneNumber = primaryPhone?.phone_number

      // Get avatar URL
      const avatarUrl = image_url || profile_image_url

      // Prepare user data for insertion
      const userInsert: SupabaseUserInsert = {
        clerk_id: id,
        email: email,
        email_verified: primaryEmail?.verification?.status === 'verified',
        first_name: first_name || '',
        last_name: last_name || '',
        username: username || '',
        avatar_url: avatarUrl || '',
        phone_number: phoneNumber || '',
        phone_verified: primaryPhone?.verification?.status === 'verified',
        external_accounts: external_accounts || [],
        last_sign_in_at: last_sign_in_at ? new Date(last_sign_in_at).toISOString() : '',
        created_at: created_at ? new Date(created_at).toISOString() : new Date().toISOString(),
        updated_at: updated_at ? new Date(updated_at).toISOString() : new Date().toISOString()
      }

      // Insert user into Supabase
      const { error } = await supabase
        .from('users')
        .insert(userInsert)

      if (error) {
        console.error('Error creating user in Supabase:', error)
        return NextResponse.json(
          { message: 'Failed to create user', error: error.message },
          { status: 500 }
        )
      }

      console.log(`User created: ${email}`)
    } catch (error) {
      console.error('Error processing user.created webhook:', error)
      return NextResponse.json(
        { message: 'Failed to process user creation' },
        { status: 500 }
      )
    }
  }

  if (type === 'user.updated') {
    try {
      const userData = data as ClerkUserData
      const { 
        id, 
        email_addresses, 
        first_name, 
        last_name,
        image_url,
        profile_image_url,
        phone_numbers,
        external_accounts,
        username,
        last_sign_in_at,
        updated_at,
        primary_email_address_id,
        primary_phone_number_id
      } = userData

      // Get primary email
      const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id)
      const email = primaryEmail?.email_address || email_addresses[0]?.email_address

      // Get primary phone (if exists)
      const primaryPhone = phone_numbers?.find(phone => phone.id === primary_phone_number_id)
      const phoneNumber = primaryPhone?.phone_number

      // Get avatar URL
      const avatarUrl = image_url || profile_image_url

      // Prepare user data for update
      const userUpdate: SupabaseUserUpdate = {
        email: email,
        email_verified: primaryEmail?.verification?.status === 'verified',
        first_name: first_name || '',
        last_name: last_name || '',
        username: username || '',
        avatar_url: avatarUrl || '',
        phone_number: phoneNumber || '',
        phone_verified: primaryPhone?.verification?.status === 'verified',
        external_accounts: external_accounts || [],
        last_sign_in_at: last_sign_in_at ? new Date(last_sign_in_at).toISOString() : '',
        updated_at: updated_at ? new Date(updated_at).toISOString() : new Date().toISOString()
      }

      // Update user in Supabase
      const { error } = await supabase
        .from('users')
        .update(userUpdate)
        .eq('clerk_id', id)

      if (error) {
        console.error('Error updating user in Supabase:', error)
        return NextResponse.json(
          { message: 'Failed to update user', error: error.message },
          { status: 500 }
        )
      }

      console.log(`User updated: ${email}`)
    } catch (error) {
      console.error('Error processing user.updated webhook:', error)
      return NextResponse.json(
        { message: 'Failed to process user update' },
        { status: 500 }
      )
    }
  }

  if (type === 'user.deleted') {
    try {
      const { id } = data as { id: string }

      // Soft delete user in Supabase
      const userUpdate: SupabaseUserUpdate = {
        status: 'inactive',
        deleted_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('users')
        .update(userUpdate)
        .eq('clerk_id', id)

      if (error) {
        console.error('Error deleting user in Supabase:', error)
        return NextResponse.json(
          { message: 'Failed to delete user', error: error.message },
          { status: 500 }
        )
      }

      console.log(`User deleted: ${id}`)
    } catch (error) {
      console.error('Error processing user.deleted webhook:', error)
      return NextResponse.json(
        { message: 'Failed to process user deletion' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json(
    { message: 'Webhook processed successfully' },
    { status: 200 }
  )
}

// Optional: Add other HTTP methods if needed
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'Webhook endpoint is active' },
    { status: 200 }
  )
}