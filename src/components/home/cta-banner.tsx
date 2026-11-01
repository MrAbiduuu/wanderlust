import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative flex h-64 items-center justify-center overflow-hidden text-center md:h-72">
      <Image
        src="/Images/CTA.png"
        alt="Aerial view of a tropical island with a plane flying over"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative flex flex-col items-center px-4 text-white">
        <h2 className="text-3xl font-light md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-xs md:text-sm">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button className="mt-6 h-10 rounded-sm bg-white px-5 text-xs font-medium tracking-wide text-neutral-900 hover:bg-white/90">
          Book Your Trip Today <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
