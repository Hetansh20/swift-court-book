import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VenueCard from "@/components/venue/VenueCard";
import { getVenues } from "@/services/supabaseData";
import type { Venue } from "@/types";

const Discover = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [q, setQ] = useState("");
  const [sport, setSport] = useState<string>("all");

  useEffect(()=>{ getVenues().then(setVenues); },[]);

  const list = venues
    .filter(v => (sport === "all" || v.sports.includes(sport)))
    .filter(v => v.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <SEO title="Discover Venues — QuickCourt" description="Browse sports venues, filter by sport and rating, and book your slot easily." canonical="/discover" />
      <Header />
      <main className="container py-10">
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
          <Input placeholder="Search by name" value={q} onChange={(e)=>setQ(e.target.value)} />
          <Select value={sport} onValueChange={setSport}>
            <SelectTrigger className="w-full md:w-[220px]"><SelectValue placeholder="Sport" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="Badminton">Badminton</SelectItem>
              <SelectItem value="Tennis">Tennis</SelectItem>
              <SelectItem value="Table Tennis">Table Tennis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(v => <VenueCard key={v.id} venue={v} />)}
        </div>
      </main>
    </>
  );
};

export default Discover;
