import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { getMyBookings } from "@/services/supabaseData";
import type { Booking } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const Confirmation = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(()=>{
    if(!user || !id) return;
    getMyBookings(user.id).then(list => setBooking(list.find(b=>b.id===id) ?? null));
  },[user, id]);

  return (
    <>
      <SEO title="Booking Confirmed — QuickCourt" description="Your booking has been confirmed." canonical={`/confirmation/${id}`} />
      <Header />
      <main className="container py-10">
        <div className="max-w-lg mx-auto rounded-lg border p-6 text-center">
          <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <span className="text-primary-foreground text-2xl">✓</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">Payment Successful</h1>
          <p className="mt-2 text-muted-foreground">Booking ID: {booking?.id}</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link to="/bookings"><Button>View Bookings</Button></Link>
            <Link to="/discover"><Button variant="secondary">Book Another</Button></Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Confirmation;
