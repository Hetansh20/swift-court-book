export type Role = "player" | "owner" | "admin";

export interface Venue {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  pricePerHour: number;
  distanceKm?: number;
  sports: string[];
  tags: string[];
  images: string[];
}

export interface Booking {
  id: string;
  user_id: string;
  venue_id: string;
  venue_name: string;
  date: string; // ISO date
  time: string; // e.g., "17:00"
  durationHours: number;
  price: number;
  status: "confirmed" | "cancelled" | "completed" | "pending";
}
