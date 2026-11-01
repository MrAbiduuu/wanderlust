import Image from "next/image";

const features = [
  {
    icon: "/Images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/Images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/Images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#e0f2fb] py-14 md:py-20">
      <div className="mx-auto max-w-5xl border border-dashed border-sky-200 px-6 py-10 md:px-10">
        <div className="text-center">
          <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-xs text-neutral-500 md:text-sm">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 shadow-sm md:p-7"
            >
              <Image
                src={feature.icon}
                alt=""
                width={28}
                height={28}
                className="size-7"
              />
              <h3 className="mt-6 text-xl text-neutral-900">{feature.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500 md:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
