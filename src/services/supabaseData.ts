import { supabase } from "@/integrations/supabase/client";
import { MOCK_VENUES } from "@/data/mock";
import type { Booking, Venue } from "@/types";

const ls = {
  get<T>(key: string, fallback: T): T {
    try { const raw = localStorage.getItem(key); return raw? JSON.parse(raw) as T : fallback; } catch { return fallback; }
  },
  set<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }
};

export async function getVenues(search?: string, city?: string): Promise<Venue[]> {
  try {
    const { data, error } = await supabase.from("venues").select("*").ilike("name", `%${search ?? ''}%`);
    if (error) throw error;
    return (data as any) as Venue[];
  } catch {
    // Fallback to mock
    const q = (search ?? "").toLowerCase();
    return MOCK_VENUES.filter(v => (!city || v.city === city) && (!q || v.name.toLowerCase().includes(q)));
  }
}

export async function getVenueById(id: string): Promise<Venue | null> {
  try {
    const { data, error } = await supabase.from("venues").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data as any;
  } catch {
    return MOCK_VENUES.find(v=>v.id===id) ?? null;
  }
}

export async function createBooking(b: Booking): Promise<Booking> {
  try {
    const { data, error } = await supabase.from("bookings").insert(b).select("*").single();
    if (error) throw error;
    return data as any as Booking;
  } catch {
    const list = ls.get<Booking[]>("bookings", []);
    list.push(b);
    ls.set("bookings", list);
    return b;
  }
}

export async function getMyBookings(userId: string): Promise<Booking[]> {
  try {
    const { data, error } = await supabase.from("bookings").select("*").eq("user_id", userId).order("date", { ascending: false });
    if (error) throw error;
    return data as any as Booking[];
  } catch {
    const list = ls.get<Booking[]>("bookings", []);
    return list.filter(b=>b.user_id===userId);
  }
}

export async function cancelBooking(id: string): Promise<void> {
  try {
    const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", id);
    if (error) throw error;
  } catch {
    const list = ls.get<Booking[]>("bookings", []);
    const idx = list.findIndex(b=>b.id===id);
    if (idx>-1) { list[idx].status = "cancelled"; ls.set("bookings", list); }
  }
}
