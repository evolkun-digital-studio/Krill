import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { FISHERY_URL, SITE } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const linkCls = "type-body text-primary-foreground/80 hover:text-primary-foreground";
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div className="space-y-4">
          <Logo inverted className="h-16" />
          <p className="type-body max-w-xs text-primary-foreground/80">
            KRIL is a small store for honey, oils, crafts and dairy made by rural and indigenous producers.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
          <Link href="/organics" className={linkCls}>Organics</Link>
          <Link href="/handicraft" className={linkCls}>Handicraft</Link>
          <Link href="/dairy" className={linkCls}>Dairy</Link>
          <a href={FISHERY_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${linkCls}`}>
            Kinikh Fishery <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <Link href="/about" className={linkCls}>About</Link>
          <Link href="/contact" className={linkCls}>Contact</Link>
          <Link href="/request-order" className={linkCls}>Request to Order</Link>
        </nav>
        <div className="space-y-2">
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className={`block ${linkCls}`}>{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`} className={`block ${linkCls}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="type-label mx-auto max-w-7xl px-5 py-6 text-primary-foreground/70 md:px-8">
          © {year} KRIL · Kinikh Rural Indigenous Livelihood · {SITE.parent}
        </p>
      </div>
    </footer>
  );
}
