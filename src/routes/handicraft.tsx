import { createFileRoute } from "@tanstack/react-router";
import heroHandicraft from "@/assets/hero-handicraft.jpg";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceShop, pageMeta } from "@/components/ServiceShop";
import { craftSteps } from "@/lib/process";

export const Route = createFileRoute("/handicraft")({
  head: () => pageMeta("Kinikh Handicraft · Handmade in the Hills | KRIL", "Ringal baskets, woollen shawls, handloom stoles and wooden crafts made by artisans of Uttarakhand and the Northeast."),
  component: Handicraft,
});

function Handicraft() {
  return (
    <ServiceShop
      service="handicraft"
      title="Kinikh Handicraft"
      text="Handmade by artisans of the hills and the Northeast."
      image={heroHandicraft}
      alt="Hands of a pahadi artisan weaving a ringal bamboo basket"
      shopHeading="Shop Handicraft"
      shopText="Each piece is made by hand, so no two are exactly alike. Send a request and we will check what the artisans have ready."
    >
      <div className="bg-card">
        <ProcessSteps
          heading="Made by hand"
          intro="Weavers in the Northeast and craftspeople in Uttarakhand's mountain villages make every piece at home, using skills passed down in their families."
          steps={craftSteps}
        />
      </div>
    </ServiceShop>
  );
}
