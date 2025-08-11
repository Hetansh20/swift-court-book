import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { getVenueById, createBooking } from "@/services/supabaseData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

function useQuery(){ const { search } = useLocation(); return new URLSearchParams(search); }

const Payment = () => {
  const { id } = useParams();
  const q = useQuery();
  const navigate = useNavigate();
  const { user } = useAuth();

  const dateISO = q.get("date") ?? "";
  const time = q.get("time") ?? "";
  const duration = Number(q.get("duration") ?? 1);

  const action = async () => {
    const venue = id ? await getVenueById(id) : null;
    if(!user) { toast({ title: "Please login", description: "Login with OTP to continue."}); navigate("/login"); return; }
    if(!venue) return;

    // Simulate payment
    const success = Math.random() > 0.2;
    if(!success) { toast({ title: "Payment failed", description: "Try again or choose another slot."}); return; }

    const booking = await createBooking({
      id: crypto.randomUUID(),
      user_id: user.id,
      venue_id: venue.id,
      venue_name: venue.name,
      date: dateISO,
      time,
      durationHours: duration,
      price: venue.pricePerHour * duration,
      status: "confirmed",
    });
    navigate(`/confirmation/${booking.id}`);
  };

  const details = useMemo(()=>({ date: new Date(dateISO).toLocaleDateString(), time, duration }), [dateISO, time, duration]);

  return (
    <>
      <SEO title="Payment — QuickCourt" description="Simulated payment gateway for QuickCourt bookings." canonical={`/payment/${id}`} />
      <Header />
      <main className="container py-10">
        <div className="max-w-md mx-auto rounded-lg border p-6">
          <h1 className="text-2xl font-bold">Confirm Payment</h1>
          <p className="mt-2 text-sm text-muted-foreground">{details.date} • {details.time} • {details.duration}h</p>
          <Button className="mt-6 w-full hover-glow" onClick={action}>Pay Now</Button>
          <p className="mt-3 text-xs text-muted-foreground">This is a simulated payment. No real charges.</p>
        </div>
      </main>
    </>
  );
};

export default Payment;
