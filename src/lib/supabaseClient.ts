import { createClient } from "@supabase/supabase-js";

// Wrapper around Supabase client. If envs are missing, exports null so code can fallback to mocks.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabase = url && anon ? createClient(url, anon) : null as any;
