"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/Images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/Images/person1.png",
  },
  {
    // Placeholder testimonials to exercise the carousel pages — swap with real data.
    quote:
      '"The Kyoto Tour Was Flawless From Booking To The Final Day. Every Temple Visit Felt Personal And Well Paced. We Will Absolutely Book Again!"',
    name: "Aisha Rahman",
    location: "Dubai, UAE",
    image: "/Images/person1.png",
  },
  {
    quote:
      '"Santorini Sunset Cruise Was The Highlight Of Our Year. Impeccable Service, Stunning Views, And A Crew That Treated Us Like Family."',
    name: "Liam Walker",
    location: "London, UK",
    image: "/Images/person2.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ loop: true, align: "start" }}>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl text-neutral-900 underline decoration-neutral-900 decoration-2 underline-offset-8 md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-xs text-neutral-500 md:text-sm">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 self-start">
              <CarouselPrevious
                size="icon-lg"
                className="static size-9 rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              />
              <CarouselNext
                size="icon-lg"
                className="static size-9 rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              />
            </div>
          </div>

          <CarouselContent className="mt-10 items-stretch">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="basis-full md:basis-1/2">
                <article className="flex h-full gap-4 border border-neutral-200 bg-white p-5">
                  <div className="flex flex-1 flex-col">
                    <blockquote className="font-display text-base leading-relaxed text-neutral-900">
                      {testimonial.quote}
                    </blockquote>
                    <div className="mt-auto pt-6">
                      <p className="text-sm text-cyan-600">— {testimonial.name}</p>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="relative w-32 shrink-0 md:w-40">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 768px) 160px, 128px"
                      className="object-cover"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
