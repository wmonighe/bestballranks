const SUPABASE_URL = 'https://njzbgmfdhlvujfvsasvb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qemJnbWZkaGx2dWpmdnNhc3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMTIxMTMsImV4cCI6MjA2NTY4ODExM30.EgnouVT_57WIh4vyUQMDnST_z78Y93BIPRml5sJqQ8U';

// Initialize the Supabase client using the global library object.
// We attach the instance to `window` so other scripts can reference it.
window.supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Log out the current user and refresh the page to update UI
window.logOut = async function() {
  try {
    await window.supabase.auth.signOut();
  } finally {
    // Regardless of result, reload so onAuthStateChange hooks run
    window.location.reload();
  }
};

// Insert the authenticated user into the Users table if they don't exist yet
// Exposed globally so any page can call it after login
window.ensureUserRow = async function(user) {
  if (!user) return;
  const { data, error } = await window.supabase
    .from('Users')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();
  if (error) {
    console.error('Error checking user row', error);
    return;
  }
  if (!data) {
    const { error: insertErr } = await window.supabase.from('Users').insert({
      id: user.id,
      email: user.email,
      username: '',
      date_created: new Date().toISOString()
    });
    if (insertErr) console.error('Error inserting user row', insertErr);
  }
};

