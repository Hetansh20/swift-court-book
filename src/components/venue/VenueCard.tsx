import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Venue } from "@/types";
import { Link } from "react-router-dom";

const VenueCard = ({ venue }: { venue: Venue }) => {
  return (
    <Card className="hover-glow h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{venue.name}</span>
          <span className="text-sm text-muted-foreground">⭐ {venue.rating.toFixed(1)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="aspect-[16/9] w-full rounded-md bg-muted mb-3 overflow-hidden">
          <img src={venue.images[0]} alt={venue.name} className="object-cover w-full h-full" />
        </div>
        <p className="text-sm text-muted-foreground">{venue.address}</p>
        <p className="text-sm mt-1">₹ {venue.pricePerHour} per hour</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {venue.tags.map(t=> <Badge key={t} variant="secondary">{t}</Badge>)}
        </div>
        <div className="mt-4">
          <Link to={`/venue/${venue.id}`}><Button className="w-full">View Details</Button></Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueCard;
