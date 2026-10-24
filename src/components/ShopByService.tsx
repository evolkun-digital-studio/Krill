import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productsByService } from "@/lib/products";
import { FISHERY_URL, heroSlides, type ServiceKey } from "@/lib/site";

const services = [
  { key: "organics", name: "Organics", line: "Honey, cold-pressed oils and jaggery", note: "From hill apiaries and wooden presses", alt: "Beekeeper tending a honey frame on a flowering hillside", to: "/organics" },
  { key: "handicraft", name: "Handicraft", line: "Baskets, shawls, stoles and woodwork", note: "Woven in Uttarakhand and the Northeast", alt: "Close-up of artisan hands weaving a ringal bamboo basket", to: "/handicraft" },
  { key: "dairy", name: "Dairy", line: "Bilona ghee, paneer, curd and butter", note: "Village cows, bilona ghee", alt: "Village cows grazing across a green hillside pasture", to: "/dairy" },
  { key: "fishery", name: "Fishery", line: "Live freshwater fish from rural ponds", note: "Clean ponds, live fish", alt: "Wide landscape of freshwater fish ponds at sunrise", to: FISHERY_URL },
] as const;

export function ShopByService() {
  const [active, setActive] = useState<ServiceKey>("organics");
  const track = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLAnchorElement | null)[]>([]);

  function selectCard(index: number) {
    const panel = panels.current[index];
    const container = track.current;
    const service = services[index];
    if (!panel || !container || !service) return;
    setActive(service.key);
    container.scrollTo({ left: panel.offsetLeft - container.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function syncVisibleCard() {
    const container = track.current;
    if (!container || window.matchMedia("(min-width: 1024px), (prefers-reduced-motion: reduce)").matches) return;
    const left = container.getBoundingClientRect().left;
    let closest = 0;
    let distance = Infinity;
    panels.current.forEach((panel, index) => {
      if (!panel) return;
      const next = Math.abs(panel.getBoundingClientRect().left - left);
      if (next < distance) { distance = next; closest = index; }
    });
    const service = services[closest];
    if (service) setActive(service.key);
  }

  return (
    <section className="service-shop" data-service={active} aria-labelledby="service-shop-heading">
      <div className="service-shop-inner mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="service-shop-heading mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 id="service-shop-heading" className="type-heading">Shop by service</h2>
            <p className="type-body mt-4 text-muted-foreground">Honey, oil, craft, milk and live fish, all from villages we work with.</p>
          </div>
          <div className="service-notes" aria-live="polite" aria-atomic="true">
            {services.map((service) => <p key={service.key} className="type-label service-note" data-active={active === service.key} aria-hidden={active !== service.key}>{service.note}</p>)}
          </div>
        </div>
        <div ref={track} className="service-panels" onScroll={syncVisibleCard}>
          {services.map((service, index) => {
            const slide = heroSlides.find((item) => item.key === service.key);
            const photos = service.key === "fishery" ? [] : productsByService(service.key).slice(0, 3);
            const content = <>
              <img className="service-panel-image" src={slide?.poster} alt={service.alt} loading="lazy" />
              <div className="service-panel-shade" aria-hidden="true" />
              <div className="service-panel-content">
                <h3 className="type-sub">Kinikh {service.name}</h3>
                <div className="service-panel-details">
                  <p className="type-body service-panel-line">{service.line}</p>
                  {photos.length > 0 ? <div className="service-product-photos">
                    {photos.map((product) => <img key={product.slug} src={product.image} alt={product.name} loading="lazy" width={64} height={64} />)}
                  </div> : <p className="type-label service-fish-label">Live fish, never frozen</p>}
                  <span className="type-label service-shop-link">{service.key === "fishery" ? "Visit Kinikh Fishery" : `Shop ${service.name}`}{service.key === "fishery" ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</span>
                </div>
              </div>
            </>;
            const shared = {
              className: "service-panel",
              "data-service": service.key,
              "data-active": active === service.key,
              onMouseEnter: (event: React.MouseEvent<HTMLAnchorElement>) => {
                const focused = event.currentTarget.ownerDocument.activeElement;
                if (focused?.matches(".service-panel:focus-visible") && focused !== event.currentTarget) return;
                setActive(service.key);
              },
              onFocus: () => setActive(service.key),
              ref: (node: HTMLAnchorElement | null) => { panels.current[index] = node; },
            };
            return <Button key={service.key} asChild variant="ghost" className="service-panel-button">
              {service.key === "fishery" ? <a {...shared} href={FISHERY_URL} target="_blank" rel="noopener noreferrer">{content}</a> : <Link {...shared} to={service.to}>{content}</Link>}
            </Button>;
          })}
        </div>
        <div className="service-tabs mt-6" aria-label="Choose a service">
          {services.map((service, index) => <Button key={service.key} variant="ghost" className="type-label service-tab" aria-pressed={active === service.key} onClick={() => selectCard(index)}>{service.name}</Button>)}
        </div>
      </div>
    </section>
  );
}