import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, TriangleAlert } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Destination } from "../../app/Types/type";
import FeaturedCarousel from "./featured-carousel";

// Returns destinations or null when the request fails / isn't JSON.
const loadFeaturedDestinations = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return null;
    if (!res.headers.get("content-type")?.includes("application/json")) {
      return null;
    }

    return (await res.json()) as Destination[];
  } catch {
    return null;
  }
};

const FeaturedSkeleton = () => (
  <div className="mt-10 grid gap-6 animate-pulse sm:grid-cols-2">
    {[0, 1].map((i) => (
      <div
        key={i}
        className="flex flex-col rounded-sm border border-border bg-white shadow-sm"
      >
        <div className="aspect-5/4 rounded-t-sm bg-muted" />
        <div className="grid gap-2 p-4">
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-1 flex items-baseline justify-between">
            <div className="h-6 w-40 rounded bg-muted" />
            <div className="h-5 w-16 rounded bg-muted" />
          </div>
          <div className="mt-2 h-4 w-20 rounded bg-muted" />
        </div>
      </div>
    ))}
  </div>
);

const Featured = () => {
  return (
    <section className="relative bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
              Featured Destinations
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-10 rounded-sm border border-border bg-white px-5 text-xs font-medium uppercase tracking-wide text-neutral-950 hover:bg-muted",
            )}
          >
            All Destinations <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Carousel */}
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedList />
        </Suspense>
      </div>
    </section>
  );
};

const FeaturedList = async () => {
  const destinations = await loadFeaturedDestinations();

  if (!destinations) {
    return (
      <div className="mt-10 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
        <TriangleAlert className="size-5 shrink-0 text-amber-600" />
        <p className="text-sm text-amber-700">
          Couldn&apos;t load featured destinations. Please try again later.
        </p>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <p className="mt-10 text-sm text-muted-foreground">
        No featured destinations yet — check back soon.
      </p>
    );
  }

  return <FeaturedCarousel destinations={destinations} />;
};

export default Featured;
