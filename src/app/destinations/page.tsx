import type { Metadata } from "next";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

import { DestinationsGrid } from "@/components/destination/destinations-grid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Destinations — Wanderlast",
  description:
    "Find your perfect travel experience from our curated collection.",
};

// Returns destinations or null when the server is offline / errors out.
const loadDestinations = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    if (!res.headers.get("content-type")?.includes("application/json")) {
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
};

const DestinationPage = async () => {
  const destinations = await loadDestinations();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      {destinations ? (
        <DestinationsGrid destinations={destinations} />
      ) : (
        <div>
          <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Explore All Destinations
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Find your perfect travel experience from our curated collection
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-xl border border-amber-200 bg-amber-50 px-6 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-full border border-amber-200 bg-amber-100">
              <TriangleAlert className="size-7 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold text-amber-800">
              Couldn&apos;t load destinations
            </h2>
            <p className="max-w-sm text-sm leading-6 text-amber-700">
              The server isn&apos;t responding right now. Make sure the backend
              is running on port 8000, then refresh this page.
            </p>
            <Link
              href="/destinations"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-2 h-11 rounded-sm border border-amber-300 bg-white px-6 text-sm font-medium text-amber-800 hover:bg-amber-100",
              )}
            >
              Try Again
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default DestinationPage;
