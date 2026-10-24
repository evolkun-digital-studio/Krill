import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const linkCls = "type-body text-muted-foreground hover:text-primary";
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div className="space-y-4">
          <Logo className="h-16" />
          <p className="type-body max-w-xs text-muted-foreground">
            KRIL is a small store for honey, oils, crafts and dairy made by rural and indigenous producers.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
          <Link href="/organics" className={linkCls}>Organics</Link>
          <Link href="/handicraft" className={linkCls}>Handicraft</Link>
          <Link href="/dairy" className={linkCls}>Dairy</Link>
          <Link href="/fishery" className={linkCls}>Fishery</Link>
          <Link href="/agro-artisan" className={linkCls}>Agro Artisan</Link>
          <Link href="/about" className={linkCls}>About</Link>
          <Link href="/contact" className={linkCls}>Contact</Link>
          <Link href="/request-order" className={linkCls}>Request to Order</Link>
        </nav>
        <div className="space-y-2">
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className={`block ${linkCls}`}>
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className={`block ${linkCls}`}>
            {SITE.email}
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="type-label mx-auto max-w-7xl px-5 py-6 text-muted-foreground md:px-8">
          © {year} KRIL · Kinikh Rural Indigenous Livelihood · {SITE.parent}
        </p>
      </div>
    </footer>
  );
}
