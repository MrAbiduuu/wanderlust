import { Banner } from "@/components/home/banner";
import Featured from "@/components/home/featured";
import { CtaBanner } from "@/components/home/cta-banner";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";

export default function Home() {
  return (
    <main>
      <Banner />
      <Featured />
      <WhyChoose />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}
