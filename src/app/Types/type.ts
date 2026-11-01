export type Review = {
  name: string;
  rating: number;
  comment: string;
  isSample: boolean;
};

export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  overview: string;
  highlights: string[];
  services: string[];
  reviews: Review[];
};

export type Booking = {
  _id: string;
  destinationId?: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  userName?: string;
  email?: string;
  bookingDate?: string;
  status?: "confirmed" | "pending" | "cancelled" | string;
};
