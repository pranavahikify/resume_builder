import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Persist session in localStorage automatically
    persistSession: true,
    // Detect session from URL hash on email confirmation redirect
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
});

// ─── AUTH HELPERS ─────────────────────────────────────────────────────────────

/** Sign up with email + password. Sends a confirmation email automatically. */
export const signUp = async ({ email, password, fullName }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      // Redirect user back to the app after clicking the verification link
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

/** Sign in with email + password. */
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

/** Sign out the current user. */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/** Get the current session (returns null if not logged in). */
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

// ─── PROFILE HELPERS ──────────────────────────────────────────────────────────

/** Fetch the profile row for the currently logged-in user. */
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

/** Update the current user's profile. */
export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

// ─── DOWNLOAD HISTORY HELPERS ─────────────────────────────────────────────────

/** Fetch all download records for the logged-in user (newest first). */
export const getDownloadHistory = async (userId) => {
  const { data, error } = await supabase
    .from('resume_downloads')
    .select('*')
    .eq('user_id', userId)
    .order('downloaded_at', { ascending: false });
  return { data, error };
};

/** Record a new resume download. */
export const recordDownload = async ({ userId, templateId, templateName, fileName, filePath, fileSizeBytes, formData }) => {
  const { data, error } = await supabase
    .from('resume_downloads')
    .insert({
      user_id: userId,
      template_id: templateId,
      template_name: templateName,
      file_name: fileName,
      file_path: filePath,
      file_size_bytes: fileSizeBytes ?? null,
      form_data: formData ?? null
    })
    .select()
    .single();
  return { data, error };
};

/** Delete a specific download record by its id. */
export const deleteDownloadRecord = async (downloadId) => {
  const { error } = await supabase
    .from('resume_downloads')
    .delete()
    .eq('id', downloadId);
  return { error };
};

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────

const BUCKET = 'resume-downloads';

/**
 * Upload a PDF blob to the user's private folder.
 * File is stored at: {userId}/{fileName}
 */
export const uploadResumePdf = async (userId, fileName, pdfBlob) => {
  const filePath = `${userId}/${fileName}`;
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, pdfBlob, {
      contentType: 'application/pdf',
      upsert: true,
    });
  return { data, filePath, error };
};

/**
 * Create a short-lived signed URL (valid for 60 minutes) so the user
 * can download a previously saved resume.
 */
export const getResumeDownloadUrl = async (filePath) => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 3600); // 1 hour
  return { url: data?.signedUrl ?? null, error };
};

/** Delete a file from storage. */
export const deleteResumeFile = async (filePath) => {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([filePath]);
  return { error };
};

export default supabase;
