import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Calendar } from "@/components/ui/calendar";
import { DEFAULT_TIMES } from "@/data/mock";
import { getVenueById } from "@/services/supabaseData";
import type { Venue } from "@/types";
import { Button } from "@/components/ui/button";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(1);

  useEffect(()=>{ if(id) getVenueById(id).then(setVenue); },[id]);

  const price = useMemo(()=> (venue? venue.pricePerHour * duration : 0), [venue, duration]);

  if(!venue) return null;

  return (
    <>
      <SEO title={`Book — ${venue.name} | QuickCourt`} description={`Choose date and time at ${venue.name}.`} canonical={`/book/${venue.id}`} />
      <Header />
      <main className="container py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Select time</h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {DEFAULT_TIMES.map(t => (
                <button key={t} onClick={()=> setTime(t)} className={`text-sm rounded-md border px-3 py-2 ${time===t? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}>{t}</button>
              ))}
            </div>
            <div className="mt-6">
              <label className="text-sm">Duration (hours)</label>
              <div className="mt-2 flex gap-2">
                {[1,2,3].map(h => (
                  <button key={h} onClick={()=> setDuration(h)} className={`text-sm rounded-md border px-3 py-2 ${duration===h? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}>{h}h</button>
                ))}
              </div>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">Price</div>
            <div className="text-2xl font-bold">₹ {price}</div>
            <Button className="mt-6 hover-glow" disabled={!date || !time} onClick={()=> navigate(`/payment/${venue.id}?date=${date?.toISOString()}&time=${time}&duration=${duration}`)}>Proceed to payment</Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Book;
