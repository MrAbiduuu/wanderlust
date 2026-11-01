import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const searchFields = [
  { label: "Location", name: "location", placeholder: "Address, City, Or Zip" },
  { label: "Date/Duration", name: "dates", placeholder: "Anytime/3 Days" },
  { label: "Budget", name: "budget", placeholder: "$0-$3000" },
  { label: "People", name: "people", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100svh-3rem)] flex-col">
      {/* Background */}
      <Image
        src="/Images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      {/* Headline */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="max-w-3xl text-5xl font-light leading-tight md:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-4 max-w-xl text-sm md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/destinations">
            <Button className="h-11 bg-cyan-300 rounded-sm px-6 text-sm font-medium uppercase tracking-wide text-neutral-950 hover:bg-cyan-400">
              Explore Now <ArrowRight />
            </Button>
          </Link>
          <Link href="/destinations">
            <Button
              variant="secondary"
              className="h-11 rounded-sm bg-white px-6 text-sm font-medium uppercase tracking-wide text-neutral-900 hover:bg-white/90"
            >
              View Destination
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick search bar */}
      <form className="flex flex-col divide-y divide-white/10 bg-black/40 backdrop-blur-sm md:flex-row md:divide-x">
        {searchFields.map((field) => (
          <div
            key={field.name}
            className="flex flex-1 flex-col gap-1 px-4 py-2.5"
          >
            <label
              htmlFor={`quick-search-${field.name}`}
              className="text-sm font-medium text-white"
            >
              {field.label}
            </label>
            <input
              id={`quick-search-${field.name}`}
              name={field.name}
              type="text"
              placeholder={field.placeholder}
              className="bg-transparent text-sm text-white outline-none placeholder:text-white/60"
            />
          </div>
        ))}
        <Button
          type="submit"
          className="h-auto flex-1 rounded-none bg-cyan-400 text-base font-medium text-neutral-950 hover:bg-cyan-300"
        >
          Search
        </Button>
      </form>
    </section>
  );
}
