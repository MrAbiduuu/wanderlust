import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  PlaneTakeoff,
  Star,
} from "lucide-react";

import { Destination } from "@/app/Types/type";
import BookingCard from "@/components/booking/BookingCard";
import { formatDate } from "@/lib/utils/formatData";
import { getTokenFromServer } from "@/lib/getTokenFormServer";

export async function generateMetadata({
  params,
}: PageProps<"/destinations/[id]">): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      const destination: Destination | null = await res.json();
      if (destination?.name) {
        return { title: `${destination.name} — Wanderlast` };
      }
    }
  } catch {
    // fall through to the default title
  }
  return { title: "Destination Details — Wanderlast" };
}

const DestinationDetailsPage = async ({
  params,
}: PageProps<"/destinations/[id]">) => {
  const { id } = await params;
  const token = await getTokenFromServer();
  let destination: Destination | null = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );
    destination = res.ok ? await res.json() : null;
  } catch {
    destination = null;
  }

  if (!destination?.name) {
    notFound();
  }

  const reviews = destination.reviews ?? [];
  const highlights = destination.highlights ?? [];
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + (review.rating || 0), 0) /
      reviews.length
    : null;

  return (
    <main className="bg-background pb-20">
      {/* Hero */}
      <section className="relative flex h-[55svh] min-h-100 text-white">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-black/20" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 py-8 md:px-6">
          <Link
            href="/destinations"
            className="flex items-center gap-2 self-start text-xs font-medium uppercase tracking-wide text-white/90 underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to Destinations
          </Link>

          <div className="mt-auto grid gap-3">
            {destination.category ? (
              <span className="w-fit rounded-sm bg-cyan-300 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-neutral-950">
                {destination.category}
              </span>
            ) : null}
            <h1 className="max-w-3xl text-4xl font-light leading-tight md:text-6xl">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" /> {destination.country}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" /> {destination.duration}
              </span>
              {destination.departureDate ? (
                <span className="flex items-center gap-1.5">
                  <PlaneTakeoff className="size-4" />
                  Departs {formatDate(destination.departureDate)}
                </span>
              ) : null}
              {averageRating !== null ? (
                <span className="flex items-center gap-1.5 rounded-sm bg-white px-2 py-0.5 font-medium text-neutral-950">
                  {averageRating.toFixed(1)}{" "}
                  <Star className="size-3.5 fill-current" />
                  <span className="text-neutral-500">
                    ({reviews.length} review{reviews.length === 1 ? "" : "s"})
                  </span>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 md:px-6 lg:grid-cols-[1fr_360px]">
        {/* Main column */}
        <div className="grid gap-12">
          {(destination.overview || destination.description) && (
            <div className="grid gap-3">
              <h2 className="text-2xl font-light text-foreground">Overview</h2>
              {destination.overview ? (
                <p className="text-sm leading-relaxed text-foreground">
                  {destination.overview}
                </p>
              ) : null}
              {destination.description ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {destination.description}
                </p>
              ) : null}
            </div>
          )}

          {highlights.length > 0 && (
            <div className="grid gap-4">
              <h2 className="text-2xl font-light text-foreground">
                Highlights
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 rounded-sm border border-border p-3"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/15">
                      <Check className="size-3 text-[#00A8E8]" />
                    </span>
                    <span className="text-sm text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {reviews.length > 0 && (
            <div className="grid gap-4">
              <h2 className="text-2xl font-light text-foreground">
                Traveler Reviews ({reviews.length})
              </h2>
              <div className="grid gap-4">
                {reviews.map((review, index) => (
                  <article
                    key={`${review.name}-${index}`}
                    className="rounded-sm border border-border p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full bg-neutral-950 text-sm font-medium text-white">
                        {review.name?.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {review.name}
                        </p>
                        <span className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              className={
                                index < (review.rating || 0)
                                  ? "size-3.5 fill-amber-400 text-amber-400"
                                  : "size-3.5 text-border"
                              }
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BookingCard destination={destination} id={id} />
      </section>
    </main>
  );
};

export default DestinationDetailsPage;
