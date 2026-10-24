import heroOrganics from "@/assets/hero-organics.jpg";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceShop } from "@/components/ServiceShop";
import { pageMeta } from "@/lib/metadata";
import { beeSteps, oilSteps } from "@/lib/process";

export const metadata = pageMeta(
  "Kinikh Organics · Honey and Cold-Pressed Oils | KRIL",
  "Raw hill honey, cold-pressed oils with no palm oil, and traditional jaggery from KRIL.",
  "/organics",
);

export default function Organics() {
  return (
    <ServiceShop
      service="organics"
      title="Kinikh Organics"
      text="Pure honey and cold-pressed oils, with no palm oil."
      image={heroOrganics}
      alt="Beekeeper holding a honey frame on a flowering hillside"
      shopHeading="Shop Organics"
      shopText="Everything here is made in small batches. Add what you need and our team will confirm price and availability."
    >
      <ProcessSteps
        variant="rail"
        heading="Bee farming"
        intro="Our honey comes from beekeepers in the hills who keep their hives among wild flowers and take honey only when the bees have plenty."
        steps={beeSteps}
      />
      <ProcessSteps
        variant="stack"
        heading="Cold-press oil"
        intro="Seeds are pressed the old way, slowly, so the oil keeps its taste, colour and goodness."
        steps={oilSteps}
        highlight="Pressed slowly, without heat, and never blended with palm oil."
      />
    </ServiceShop>
  );
}
