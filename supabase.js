const SUPABASE_URL = 'https://njzbgmfdhlvujfvsasvb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qemJnbWZkaGx2dWpmdnNhc3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMTIxMTMsImV4cCI6MjA2NTY4ODExM30.EgnouVT_57WIh4vyUQMDnST_z78Y93BIPRml5sJqQ8U';

// Initialize the Supabase client using the global library object.
// We attach the instance to `window` so other scripts can reference it.
window.supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
