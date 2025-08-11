import type { Venue } from "@/types";

export const MOCK_VENUES: Venue[] = [
  {
    id: "v1",
    name: "SBR Badminton",
    city: "Ahmedabad",
    address: "Vaishnodevi Cir",
    rating: 4.6,
    pricePerHour: 250,
    distanceKm: 1.2,
    sports: ["Badminton"],
    tags: ["Top Rated", "Budget", "Indoor"],
    images: ["/placeholder.svg"],
  },
  {
    id: "v2",
    name: "Skyline Tennis Arena",
    city: "Ahmedabad",
    address: "Thaltej",
    rating: 4.4,
    pricePerHour: 400,
    distanceKm: 3.5,
    sports: ["Tennis"],
    tags: ["Outdoor"],
    images: ["/placeholder.svg"],
  },
  {
    id: "v3",
    name: "City Sports Hub",
    city: "Ahmedabad",
    address: "Prahlad Nagar",
    rating: 4.2,
    pricePerHour: 350,
    distanceKm: 2.1,
    sports: ["Badminton", "Table Tennis"],
    tags: ["Family Friendly"],
    images: ["/placeholder.svg"],
  },
];

export const DEFAULT_TIMES = [
  "06:00","07:00","08:00","09:00","10:00","16:00","17:00","18:00","19:00","20:00","21:00"
];
