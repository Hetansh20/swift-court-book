import { supabase } from "@/lib/supabaseClient";

export type ProfileRole = "player" | "owner" | "admin";

export interface Profile {
  id: string;
  full_name?: string;
  role: ProfileRole;
  created_at?: string;
}

export async function upsertProfile(p: Profile) {
  if (supabase) {
    await supabase.from("profiles").upsert(p, { onConflict: "id" });
    return;
  }
  localStorage.setItem("qc_profile", JSON.stringify(p));
}

export async function getProfile(id: string): Promise<Profile | null> {
  if (supabase) {
    const { data } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
    return data as any;
  }
  const raw = localStorage.getItem("qc_profile");
  return raw? JSON.parse(raw) as Profile : null;
}
