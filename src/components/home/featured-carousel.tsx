"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Building2, Compass, Landmark, Mountain, Sun } from "lucide-react";

import type { Destination, Review } from "@/app/Types/type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Beach: Sun,
  Mountain: Mountain,
  City: Building2,
  Adventure: Landmark,
  Cultural: Compass,
  default: Compass,
};

const FeaturedCard = ({ destination }: { destination: Destination }) => {
  const CategoryIcon = categoryIcons[destination.category] ?? categoryIcons.default;
  const reviews: Review[] = destination.reviews ?? [];
  // fall back to the design's static rating when a package has no reviews yet
  const rating = reviews.length
    ? reviews.reduce((total, review) => total + (review.rating || 0), 0) /
      reviews.length
    : 4.5;
  const price = Number(destination.price) || 0;

  return (
    <article className="group flex h-full flex-col rounded-sm border border-border bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-5/4 overflow-hidden rounded-t-sm">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-white px-2 py-0.5 text-xs font-semibold text-neutral-950">
          {rating.toFixed(1)} <Star className="size-3.5 fill-current" />
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-1.5 p-4 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <CategoryIcon className="size-3.5" />
          {destination.category}
        </p>
        <p className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {destination.duration}
        </p>

        <div className="mt-1 flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {destination.name}
          </h3>
          <p className="whitespace-nowrap text-base font-semibold text-foreground">
            ${price}
            <span className="text-xs font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <Link
          href={`/destinations/${destination._id}`}
          className="mt-3 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#00A8E8] underline-offset-4 hover:underline"
        >
          Book Now <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
};

/* Bottom bar: "2/5" counter + circular prev/next buttons */
const CarouselControls = ({ count }: { count: number }) => {
  const { api, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;

    const update = () => setCurrent(api.selectedScrollSnap() + 1);
    update();
    api.on("select", update);
    return () => {
      api.off("select", update);
    };
  }, [api]);

  const baseClass =
    "flex size-10 items-center justify-center rounded-full border border-border text-neutral-950 transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="mt-8 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{current}</span>/{count}
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous destinations"
          className={cn(baseClass)}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next destinations"
          className={cn(baseClass)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
};

const FeaturedCarousel = ({ destinations }: { destinations: Destination[] }) => {
  return (
    <Carousel
      opts={{ align: "start", loop: false }}
      className="mt-10"
      data-slot="featured-carousel"
    >
      <CarouselContent>
        {destinations.map((destination) => (
          <CarouselItem
            key={destination._id}
            className="basis-full sm:basis-1/2"
          >
            <FeaturedCard destination={destination} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselControls count={destinations.length} />
    </Carousel>
  );
};

export default FeaturedCarousel;
