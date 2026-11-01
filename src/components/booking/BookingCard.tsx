"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleAlert,
  Loader2,
  MapPin,
  PlaneTakeoff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import EditDestinationDialog from "../destination/EditDestinationDialog";
import DeleteDestinationDialog from "../destination/deleteDestinationDialog";
import { Destination } from "../../app/Types/type";
import { authClient } from "@/lib/auth-client";

const BookingCard = ({
  destination,
  id,
}: {
  destination: Destination;
  id: string;
}) => {
  const router = useRouter();
  const [isBooked, setIsBooked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState(
    destination.departureDate?.split("T")[0] || "",
  );

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const price = Number(destination.price) || 0;
  const services = destination.services ?? [];

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    if (isBooked || isBooking) return;

    try {
      setIsBooking(true);
      setBookingError(null);

      const data = {
        userName: user.name,
        email: user.email,
        image: user.image,
        ...destination,
        destinationId: destination._id,
        departureDate,
        bookingDate: new Date(),
      };

      const res = await fetch("http://localhost:8000/my-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Booking failed");
      }

      setIsBooked(true);
      router.refresh();
    } catch {
      setBookingError(
        "We couldn't confirm your booking. Please try again in a moment.",
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <aside className="grid gap-4 self-start lg:sticky lg:top-8">
      {/* Booking card */}
      <div className="rounded-sm border border-border bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Price Per Person
        </p>
        <p className="mt-1 text-4xl font-medium text-foreground">
          ${price}
          <span className="text-sm font-normal text-muted-foreground">
            /person
          </span>
        </p>

        <div className="mt-5 grid gap-2.5 border-t border-border pt-5 text-sm">
          {destination.duration ? (
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4" /> Duration
              </span>
              <span className="text-right font-medium text-foreground">
                {destination.duration}
              </span>
            </div>
          ) : null}

          {destination.category ? (
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-4" /> Category
              </span>
              <span className="text-right font-medium text-foreground">
                {destination.category}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col mt-2">
          {/* departure date selecting */}
          <form onSubmit={handleBooking}>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <PlaneTakeoff className="size-4" />
                Select Departure Date
              </span>

              <input
                type="date"
                name="departureDate"
                value={departureDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
                className="w-full rounded-sm border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-cyan-400"
              />
            </div>

            {/* booking section */}
            <Button
              type="submit"
              disabled={isBooked || isBooking}
              className="mt-6 h-11 w-full rounded-sm bg-cyan-300 text-sm font-medium uppercase tracking-wide text-neutral-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBooking ? (
                <>
                  <Loader2 className="animate-spin" /> Booking...
                </>
              ) : isBooked ? (
                <>
                  <Check /> Booked
                </>
              ) : (
                <>
                  Book Now <ArrowRight />
                </>
              )}
            </Button>
          </form>

          {bookingError && (
            <p className="mt-3 flex items-start gap-2 rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
              {bookingError}
            </p>
          )}

          {isBooked && (
            <Link
              href="/my-bookings"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-3 h-10 w-full rounded-sm border border-cyan-200 bg-cyan-50 text-xs font-semibold uppercase tracking-wide text-[#0095d1] hover:bg-cyan-100",
              )}
            >
              View Your Bookings <ArrowRight className="size-3.5" />
            </Link>
          )}

          <div className="mt-3 flex w-full gap-3">
            <div className="flex-1 [&_button]:w-full">
              <EditDestinationDialog destination={destination} />
            </div>

            <div className="flex-1 [&_button]:w-full">
              <DeleteDestinationDialog id={id} />
            </div>
          </div>
        </div>
      </div>

      {/* Services card */}
      {services.length > 0 && (
        <div className="rounded-sm border border-border bg-white p-6 shadow-sm">
          <h3 className="text-base font-medium text-foreground">
            What&apos;s Included
          </h3>
          <ul className="mt-4 grid gap-2.5">
            {services.map((service) => (
              <li
                key={service}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-[#00A8E8]" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default BookingCard;
