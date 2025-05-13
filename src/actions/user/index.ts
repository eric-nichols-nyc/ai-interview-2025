'use server'

import { createClient } from "@/utils/supabase/server";

// This function is intended to handle Google sign-in using Supabase Auth.
//
// Steps to implement:
// 1. Use Supabase's signInWithOAuth({ provider: 'google' }) to initiate Google sign-in.
// 2. After successful authentication, retrieve the authenticated user's information from Supabase (e.g., using supabase.auth.getUser()).
// 3. Check your custom 'users' table in the database to see if a user with the authenticated user's id/email exists.
// 4. If the user does not exist in your custom table, insert a new record with relevant user information (e.g., id, email, name, avatar_url, etc.).
// 5. If the user already exists, proceed as normal (e.g., return user info or session).
//
// Note: The custom 'users' table must exist in your Supabase database. If it does not, you will need to create it first.
//
// Example fields for a custom users table: id (uuid), email (text), name (text), avatar_url (text), created_at (timestamp), etc.
//
// This function currently only initializes the Supabase client. The above logic should be implemented to fully support user creation/check after Google sign-in.

export async function signInWithGoogle() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    if (error) {
        console.error('Error signing in with Google:', error);
    }
    // create a new user in the database
    return { data };
}