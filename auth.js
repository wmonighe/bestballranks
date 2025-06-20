import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/supabase.min.js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let currentSession = null;

function saveSession(session) {
  currentSession = session;
  if (session) {
    localStorage.setItem('sb_session', JSON.stringify(session));
  } else {
    localStorage.removeItem('sb_session');
  }
  updateNav();
}

function updateNav() {
  const nav = document.querySelector('.nav-right');
  if (!nav) return;
  nav.innerHTML = '';
  if (currentSession?.user) {
    const name = currentSession.user.email.split('@')[0];
    const span = document.createElement('span');
    span.textContent = `${name} \u25BC`;
    const logout = document.createElement('a');
    logout.href = '#';
    logout.textContent = 'Log out';
    logout.addEventListener('click', e => { e.preventDefault(); signOut(); });
    nav.append(span, logout);
  } else {
    const su = document.createElement('a');
    su.href = '/auth.html?mode=signup';
    su.textContent = 'Sign Up';
    const li = document.createElement('a');
    li.href = '/auth.html?mode=login';
    li.textContent = 'Login';
    nav.append(su, li);
  }
}

export async function init() {
  const saved = localStorage.getItem('sb_session');
  if (saved && !currentSession) {
    try {
      const session = JSON.parse(saved);
      await supabase.auth.setSession(session);
      currentSession = session;
    } catch (e) {
      localStorage.removeItem('sb_session');
    }
  } else {
    const { data } = await supabase.auth.getSession();
    currentSession = data.session;
  }
  updateNav();
  supabase.auth.onAuthStateChange((_ev, session) => {
    saveSession(session);
  });
}

export async function signUp(email, password) {
  // Requires SMTP configured in Supabase project for confirmation emails
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (!error) saveSession(data.session);
  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error) saveSession(data.session);
  return { data, error };
}

export async function signInWithGoogle(redirectUrl) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectUrl }
  });
  return { data, error };
}

export async function signOut() {
  await supabase.auth.signOut();
  saveSession(null);
}

export function currentUser() {
  return currentSession;
}

window.Auth = { init, signUp, signIn, signInWithGoogle, signOut, currentUser };
