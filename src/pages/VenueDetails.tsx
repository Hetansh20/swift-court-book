import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getVenueById } from "@/services/supabaseData";
import type { Venue } from "@/types";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(()=>{ if(id) getVenueById(id).then(setVenue); },[id]);

  if(!venue) return null;

  return (
    <>
      <SEO title={`${venue.name} — QuickCourt`} description={`View details, amenities and book a slot at ${venue.name}.`} canonical={`/venue/${venue.id}`} />
      <Header />
      <main className="container py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-[16/9] w-full rounded-lg bg-muted" />
            <div className="mt-4 flex flex-wrap gap-2">
              {venue.tags.map(t=> <Badge key={t} variant="secondary">{t}</Badge>)}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{venue.name}</h1>
            <p className="text-muted-foreground mt-1">{venue.address}</p>
            <p className="mt-3">⭐ {venue.rating.toFixed(1)} • ₹ {venue.pricePerHour}/hr</p>
            <div className="mt-6">
              <Button className="hover-glow" onClick={()=> navigate(`/book/${venue.id}`)}>Select slot & Book</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VenueDetails;
