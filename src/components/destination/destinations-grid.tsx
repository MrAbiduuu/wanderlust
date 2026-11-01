"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const priceRanges = [
  { value: "under-200", label: "Under $200", min: 0, max: 200 },
  { value: "200-300", label: "$200 - $300", min: 200, max: 300 },
  { value: "300-500", label: "$300 - $500", min: 300, max: 500 },
  { value: "above-500", label: "Above $500", min: 500, max: Infinity },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

const NONE = "all";

export function DestinationsGrid({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const filtered = destinations
    .filter(
      (destination) =>
        !category ||
        category === NONE ||
        destination.category.toLowerCase() === category.toLowerCase(),
    )
    .filter((destination) => {
      if (!priceRange || priceRange === NONE) return true;
      const range = priceRanges.find((item) => item.value === priceRange);
      if (!range) return true;
      const price = Number(destination.price) || 0;
      return price >= range.min && price < range.max;
    });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (Number(a.price) || 0) - (Number(b.price) || 0);
      case "price-desc":
        return (Number(b.price) || 0) - (Number(a.price) || 0);
      case "name-asc":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Heading */}
      <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>

      {/* Filters */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Select
          value={category}
          onValueChange={(value) => setCategory(value ?? null)}
        >
          <SelectTrigger className="h-11 w-full rounded-sm border-border bg-white text-xs font-medium uppercase tracking-wide">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>All Categories</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={priceRange}
          onValueChange={(value) => setPriceRange(value ?? null)}
        >
          <SelectTrigger className="h-11 w-full rounded-sm border-border bg-white text-xs font-medium uppercase tracking-wide">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>All Prices</SelectItem>
            {priceRanges.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value ?? null)}
        >
          <SelectTrigger className="h-11 w-full rounded-sm border-border bg-white text-xs font-medium uppercase tracking-wide">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Result count */}
      <p className="mt-6 text-sm text-foreground">
        Showing {sorted.length}{" "}
        {sorted.length === 1 ? "destination" : "destinations"}
      </p>

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 hover:bg-gray">
          {sorted.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">
          No destinations match your filters. Try adjusting your selection.
        </p>
      )}
    </div>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  const price = Number(destination.price) || 0;

  return (
    <article className="flex flex-col">
      {/* Image */}
      <div className="relative aspect-5/4 overflow-hidden rounded-sm">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Rating — static value from the design; backend has no rating yet */}
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-white px-2 py-0.5 text-xs font-semibold text-neutral-950">
          4.5 <Star className="size-3.5 fill-current" />
        </span>
      </div>

      {/* Details */}
      <div className="mt-4 grid gap-1.5">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" />
          {destination.country}
        </p>

        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base font-medium text-foreground">
            {destination.name}
          </h3>
          <p className="text-lg font-semibold whitespace-nowrap text-foreground">
            ${price}
            <span className="text-xs font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {destination.duration}
        </p>

        <Link
          href={`/destinations/${destination._id}`}
          className="flex items-center gap-1 text-xs font-medium tracking-wide text-[#00A8E8] uppercase underline underline-offset-4 hover:text-[#0095d1]"
        >
          Book Now <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
