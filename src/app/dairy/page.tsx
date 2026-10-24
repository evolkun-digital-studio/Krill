import heroDairy from "@/assets/hero-dairy.jpg";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceShop } from "@/components/ServiceShop";
import { pageMeta } from "@/lib/metadata";
import { dairySteps } from "@/lib/process";

export const metadata = pageMeta(
  "Kinikh Dairy · Fresh Village Dairy | KRIL",
  "Bilona ghee, fresh paneer, curd, white butter and more from village desi cows.",
  "/dairy",
);

export default function Dairy() {
  return (
    <ServiceShop
      service="dairy"
      title="Kinikh Dairy"
      text="Fresh village dairy, made the traditional way."
      image={heroDairy}
      alt="Desi cows grazing in a green village pasture"
      shopHeading="Shop Dairy"
      shopText="Dairy is made fresh to order. Our team will confirm what can reach you and when."
    >
      <div className="bg-dairy-cream">
        <ProcessSteps
          heading="From pasture to pot"
          intro="Our cows graze in open village fields. Milk is handled with care and turned into ghee, paneer and curd the way it has always been done at home."
          steps={dairySteps}
        />
      </div>
    </ServiceShop>
  );
}
