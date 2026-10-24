import { createFileRoute } from "@tanstack/react-router";
import heroOrganics from "@/assets/hero-organics.jpg";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceShop, pageMeta } from "@/components/ServiceShop";
import { beeSteps, oilSteps } from "@/lib/process";

export const Route = createFileRoute("/organics")({
  head: () => pageMeta("Kinikh Organics · Honey and Cold-Pressed Oils | KRIL", "Raw hill honey, cold-pressed oils with no palm oil, and traditional jaggery from KRIL."),
  component: Organics,
});

function Organics() {
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
      <div className="bg-card">
        <ProcessSteps
          heading="Bee farming"
          intro="Our honey comes from beekeepers in the hills who keep their hives among wild flowers and take honey only when the bees have plenty."
          steps={beeSteps}
        />
      </div>
      <ProcessSteps
        heading="Cold-press oil"
        intro="Seeds are pressed the old way, slowly, so the oil keeps its taste, colour and goodness."
        steps={oilSteps}
        highlight="Pressed slowly, without heat, and never blended with palm oil."
      />
    </ServiceShop>
  );
}
