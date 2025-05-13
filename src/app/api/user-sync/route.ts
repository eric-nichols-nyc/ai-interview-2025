import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    let supabase;
    try {
      supabase = await createClient();
    } catch (e) {
      console.error('Failed to create Supabase client:', e);
      return NextResponse.json({ error: 'Internal server error (client)' }, { status: 500 });
    }

    let user;
    try {
      ({ user } = await req.json());
    } catch (e) {
      console.error('Failed to parse JSON body:', e);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (!user || !user.id || !user.email) {
      return NextResponse.json({ error: 'Missing user info' }, { status: 400 });
    }

    // Check if user exists
    const { data: existing, error: selectError } = await supabase
      .from('users')
      .select('email')
      .eq('email', user.email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('Error selecting user:', selectError);
      return NextResponse.json({ error: selectError.message || 'Database error (select)' }, { status: 500 });
    }

    if (!existing) {
      // Insert new user
      const { error: insertError } = await supabase.from('users').insert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
      });
      if (insertError) {
        console.error('Error inserting user:', insertError);
        return NextResponse.json({ error: insertError.message || 'Database error (insert)' }, { status: 500 });
      }
      return NextResponse.json({ created: true });
    }

    return NextResponse.json({ exists: true });
  } catch (e) {
    console.error('Unexpected error in user-sync route:', e);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
} 