import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { getMyBookings, cancelBooking } from "@/services/supabaseData";
import type { Booking } from "@/types";
import { Button } from "@/components/ui/button";

const Bookings = () => {
  const { user } = useAuth();
  const [list, setList] = useState<Booking[]>([]);

  useEffect(()=>{ if(user) getMyBookings(user.id).then(setList); },[user]);

  const canCancel = (b: Booking) => new Date(b.date).getTime() > Date.now();

  return (
    <>
      <SEO title="My Bookings — QuickCourt" description="View and manage your QuickCourt bookings." canonical="/bookings" />
      <Header />
      <main className="container py-10">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        <div className="space-y-4">
          {list.map(b => (
            <div key={b.id} className="rounded-lg border p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{b.venue_name}</div>
                <div className="text-sm text-muted-foreground">{new Date(b.date).toLocaleDateString()} • {b.time} • {b.durationHours}h</div>
                <div className="text-sm mt-1">₹ {b.price} • {b.status}</div>
              </div>
              {canCancel(b) && b.status === 'confirmed' && (
                <Button variant="secondary" onClick={async ()=>{ await cancelBooking(b.id); const fresh = await getMyBookings(user!.id); setList(fresh); }}>Cancel</Button>
              )}
            </div>
          ))}
          {list.length===0 && <p className="text-muted-foreground">No bookings yet.</p>}
        </div>
      </main>
    </>
  );
};

export default Bookings;
