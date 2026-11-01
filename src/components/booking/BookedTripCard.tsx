"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Loader2,
  MapPin,
  Ticket,
  Trash2,
} from "lucide-react";

import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import type { Booking } from "../../app/Types/type";

const statusStyles = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
  },
  pending: {
    label: "Pending",
    icon: Clock3,
    badge: "border-amber-200 bg-amber-50 text-amber-600",
  },
  cancelled: {
    label: "Cancelled",
    icon: Clock3,
    badge: "border-red-200 bg-red-50 text-red-500",
  },
} as const;

type StatusKey = keyof typeof statusStyles;

const BookedTripCard = ({ booking }: { booking: Booking }) => {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);

  const statusKey = (booking.status?.toLowerCase() ?? "confirmed") as StatusKey;
  const status = statusStyles[statusKey] ?? statusStyles.confirmed;
  const StatusIcon = status.icon;

  const price = Number(booking.price) || 0;
  const departureDate = booking.departureDate?.split("T")[0] || "";

  const handleCancel = async () => {
    if (isCancelling) return;

    try {
      setIsCancelling(true);
      const res = await fetch(
        `http://localhost:8000/my-bookings/${booking._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-white p-3 shadow-sm transition-all duration-200 hover:border-cyan-200 hover:shadow-md sm:flex-row sm:items-stretch sm:gap-5">
      {/* Image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg sm:h-auto sm:w-52 lg:w-60">
        <Image
          src={booking.imageUrl}
          alt={booking.name}
          fill
          unoptimized
          sizes="(min-width: 640px) 240px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
        <span
          className={cn(
            "flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
            status.badge,
          )}
        >
          <StatusIcon className="size-3.5" />
          {status.label}
        </span>

        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {booking.name}
        </h3>

        <div className="grid gap-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            Departure:{" "}
            <span className="font-medium text-foreground">{departureDate}</span>
          </p>

          <p className="flex min-w-0 items-center gap-1.5">
            <Ticket className="size-3.5 shrink-0" />
            Booking ID:{" "}
            <span className="truncate font-medium text-foreground">
              {booking._id}
            </span>
          </p>
        </div>

        <p className="mt-auto pt-2 text-2xl font-semibold text-[#00A8E8]">
          ${price}
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            /person
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-end gap-3 sm:py-1">
        <Button
          onClick={handleCancel}
          disabled={isCancelling}
          variant="outline"
          className="h-9 gap-1.5 rounded-md border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 hover:border-red-300 hover:bg-red-100 hover:text-red-700"
        >
          {isCancelling ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-3.5" />
          )}
          {isCancelling ? "Cancelling..." : "Cancel"}
        </Button>

        <Link
          href={
            booking.destinationId
              ? `/destinations/${booking.destinationId}`
              : "/destinations"
          }
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-9 gap-1.5 rounded-md bg-[#00A8E8] px-4 text-sm font-semibold text-white hover:bg-[#0095d1]",
          )}
        >
          <Eye className="size-3.5" />
          View
        </Link>
      </div>
    </article>
  );
};

export default BookedTripCard;
