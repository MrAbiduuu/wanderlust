import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found — Wanderlast",
  description:
    "Looks like you've wandered off the map. Let's get you back on course.",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100svh-3rem)] flex-col items-center justify-center px-4 text-center text-white">
      {/* Background */}
      <Image
        src="/Images/CTA.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative flex flex-col items-center">
        <span className="font-display text-8xl font-light leading-none md:text-9xl">
          404
        </span>
        <h1 className="mt-6 max-w-3xl text-4xl font-light leading-tight md:text-6xl">
          This Destination Doesn&apos;t Exist
        </h1>
        <p className="mt-4 max-w-xl text-sm md:text-base">
          Looks like you&apos;ve wandered off the map. Let&apos;s get you back
          on course.
        </p>
        <Button className="mt-8 h-11 rounded-sm bg-cyan-300 px-6 text-sm font-medium uppercase tracking-wide text-neutral-950 hover:bg-cyan-400">
          <Link href="/">
            Back To Home <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
