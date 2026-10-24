import { RequestOrderForm } from "@/components/RequestOrderForm";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Request to Order | KRIL",
  "Send KRIL a request for the items in your cart. Our team will confirm price, availability and delivery.",
  "/request-order",
);

export default function RequestOrder() {
  return <RequestOrderForm />;
}
