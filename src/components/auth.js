import { supabase } from './supabase';

export const signIn = async (email) => {
  const { user, error } = await supabase.auth.signIn({
    email,
  });

  if (error) {
    console.error('Error signing in:', error.message);
  } else {
    console.log('Sign in successful:', user);
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    console.log('Sign out successful');
  }
};