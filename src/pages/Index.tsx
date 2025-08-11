import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import VenueCard from "@/components/venue/VenueCard";
import { getVenues } from "@/services/supabaseData";
import type { Venue } from "@/types";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [q, setQ] = useState("");
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(()=>{ getVenues().then(setVenues); },[]);

  const filtered = useMemo(()=> venues.filter(v => v.name.toLowerCase().includes(q.toLowerCase())), [q, venues]);

  return (
    <>
      <SEO title="QuickCourt — Find Players & Venues Nearby" description="Discover top sports venues near you and book courts in seconds with OTP login." canonical="/" />
      <Header />
      <main className="min-h-screen">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-primary)" }} />
          <div className="container relative py-20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Find Players & Venues Nearby</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">Search courts by sport and location. Reserve a slot and get playing in under a minute.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
              <Input placeholder="Search for venues" value={q} onChange={(e)=>setQ(e.target.value)} />
              <Button onClick={()=> toast({ title: "Tip", description: "Use filters on Discover to refine results."})}>Search</Button>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="/discover" className="text-sm underline">Discover</a>
              <a href="/bookings" className="text-sm underline">My Bookings</a>
            </div>
          </div>
        </section>
        <section className="container py-10">
          <h2 className="text-xl font-semibold mb-4">Top Venues</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(v => <VenueCard key={v.id} venue={v} />)}
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
