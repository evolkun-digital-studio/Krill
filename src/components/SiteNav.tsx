"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { FISHERY_URL } from "@/lib/site";

const links = [
  { label: "Home", to: "/" },
  { label: "Organics", to: "/organics" },
  { label: "Handicraft", to: "/handicraft" },
  { label: "Dairy", to: "/dairy" },
] as const;
const after = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteNav() {
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu belongs to the page it was opened on, so it closes by itself on navigation.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menu = menuPath === pathname;
  const setMenu = (fn: (open: boolean) => boolean) => setMenuPath(fn(menu) ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = pathname === "/" && !scrolled && !menu;
  const tone = overHero ? "text-on-dark" : "text-foreground";

  const linkCls = `type-label transition-opacity hover:opacity-70 ${tone}`;
  const active = (to: string, exact: boolean) =>
    (exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`)) ? " underline underline-offset-8" : "";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        overHero ? "bg-transparent" : "border-b border-border bg-ivory/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="KRIL home">
          <Logo inverted={overHero} className="h-12 md:h-14" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.to} href={l.to} className={linkCls + active(l.to, true)}>
              {l.label}
            </Link>
          ))}
          <a href={FISHERY_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${linkCls}`}>
            Fishery <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
          {after.map((l) => (
            <Link key={l.to} href={l.to} className={linkCls + active(l.to, false)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className={`relative inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-foreground/5 ${tone}`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="type-label absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenu((v) => !v)}
            aria-label="Menu"
            className={`inline-flex size-11 items-center justify-center rounded-full lg:hidden ${tone}`}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <nav className="border-t border-border bg-ivory px-5 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <Link key={l.to} href={l.to} className="type-body block py-3 text-foreground">
              {l.label}
            </Link>
          ))}
          <a href={FISHERY_URL} target="_blank" rel="noopener noreferrer" className="type-body flex items-center gap-1 py-3 text-foreground">
            Fishery <ArrowUpRight className="size-4" aria-hidden />
          </a>
          {after.map((l) => (
            <Link key={l.to} href={l.to} className="type-body block py-3 text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
