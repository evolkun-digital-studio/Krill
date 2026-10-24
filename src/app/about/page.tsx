import Image from "next/image";
import portrait from "@/assets/portrait-community.jpg";
import hands from "@/assets/intro-hands.jpg";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "About KRIL · Kinikh Rural Indigenous Livelihood",
  "KRIL works with rural and indigenous producers in Uttarakhand and the Northeast to bring their honey, oils, crafts and dairy to your home.",
  "/about",
);

export default function About() {
  return (
    <>
      <PageHeader
        title="About KRIL"
        text="Kinikh Rural Indigenous Livelihood, a KINIKH Group Enterprise."
        image={portrait}
        alt="Members of a rural community together in their village"
      />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <Reveal>
          <h2 className="type-heading">Livelihoods that stay in the village</h2>
          <p className="type-body mt-5 text-muted-foreground">
            KRIL started with a simple wish: that families in the hills and the Northeast could earn a fair living from what they already do well. Beekeeping, pressing oil, weaving, carving and caring for cattle are skills these communities have held for generations.
          </p>
          <p className="type-body mt-4 text-muted-foreground">
            We work directly with producers, pay fairly for their time, and keep batches small so that nothing is rushed. When you order from KRIL, you are buying from a person, not a factory.
          </p>
        </Reveal>
        <Reveal className="group overflow-hidden rounded-3xl">
          <Image src={hands} alt="Hands holding fresh produce from the field" sizes="(min-width: 768px) 50vw, 100vw" className="img-zoom aspect-[4/5] w-full object-cover" />
        </Reveal>
      </section>
    </>
  );
}
