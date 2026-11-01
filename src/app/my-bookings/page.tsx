import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { PlaneTakeoff, TriangleAlert } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BookedTripCard from "@/components/booking/BookedTripCard";
import type { Booking } from "../Types/type";
import { getTokenFromServer } from "@/lib/getTokenFormServer";

// Returns bookings or null when the request fails (offline / bad route).
const loadBookings = async (email?: string) => {
  try {
    const token = await getTokenFromServer();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${email}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) return null;
    // Backend may return HTML error pages — never try to json() those.
    if (!res.headers.get("content-type")?.includes("application/json")) {
      return null;
    }

    const data = await res.json();
    return Array.isArray(data) ? data : (data?.bookings ?? []);
  } catch {
    return null;
  }
};

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      {/* Heading */}
      <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
        My Bookings
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>

      <Suspense fallback={<BookingsSkeleton />}>
        <Bookings email={user?.email} />
      </Suspense>
    </main>
  );
};

const Bookings = async ({ email }: { email?: string }) => {
  // Not logged in
  if (!email) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-white px-6 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50">
          <PlaneTakeoff className="size-8 text-[#00A8E8]" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          You&apos;re not logged in
        </h2>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Log in to see your upcoming travel plans and manage your bookings.
        </p>

        <Link
          href="/login"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-2 h-11 rounded-sm bg-cyan-300 px-6 text-sm font-medium uppercase tracking-wide text-neutral-950 hover:bg-cyan-400",
          )}
        >
          Log In
        </Link>
      </div>
    );
  }

  const bookings = await loadBookings(email);

  // Request failed (server offline / wrong route)
  if (bookings === null) {
    return (
      <div className="mt-10 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
        <TriangleAlert className="size-5 shrink-0 text-amber-600" />
        <p className="text-sm text-amber-700">
          Couldn&apos;t load your bookings. Make sure the server is running and
          try refreshing the page.
        </p>
      </div>
    );
  }

  if (bookings.length > 0) {
    return (
      <div className="mt-10 grid gap-6">
        {bookings.map((booking: Booking) => (
          <BookedTripCard key={booking._id} booking={booking} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-white px-6 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50">
        <PlaneTakeoff className="size-8 text-[#00A8E8]" />
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        No destinations booked yet
      </h2>
      <p className="max-w-sm text-sm leading-6 text-muted-foreground">
        Your next adventure is waiting. Explore our curated destinations and
        book your first trip today.
      </p>

      <Link
        href="/destinations"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-2 h-11 rounded-sm bg-cyan-300 px-6 text-sm font-medium uppercase tracking-wide text-neutral-950 hover:bg-cyan-400",
        )}
      >
        Browse Destinations
      </Link>
    </div>
  );
};

const BookingsSkeleton = () => (
  <div className="mt-10 grid gap-6">
    {[0, 1].map((i) => (
      <div
        key={i}
        className="flex animate-pulse flex-col gap-4 rounded-xl border border-border bg-white p-3 sm:flex-row sm:gap-5"
      >
        <div className="h-44 w-full shrink-0 rounded-lg bg-muted sm:h-auto sm:w-52" />
        <div className="flex flex-1 flex-col gap-3 py-1">
          <div className="h-5 w-24 rounded-full bg-muted" />
          <div className="h-6 w-1/3 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
          <div className="h-4 w-2/5 rounded bg-muted" />
          <div className="mt-auto h-8 w-24 rounded bg-muted" />
        </div>
      </div>
    ))}
  </div>
);

export default MyBookingsPage;
