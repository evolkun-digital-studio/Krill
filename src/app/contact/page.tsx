import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { pageMeta } from "@/lib/metadata";
import { SITE, WHATSAPP_NUMBER } from "@/lib/site";

export const metadata = pageMeta("Contact KRIL", "Call, WhatsApp or email KRIL for orders and questions about our rural products.", "/contact");

export default function Contact() {
  const cards = [
    { icon: Phone, title: "Call us", text: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, title: "WhatsApp", text: "Message our team", href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { icon: Mail, title: "Email", text: SITE.email, href: `mailto:${SITE.email}` },
  ];
  return (
    <>
      <PageHeader title="Contact KRIL" text="We are happy to help with orders, bulk requests or any question about our producers." />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-24 md:grid-cols-3 md:px-8">
        {cards.map((c) => (
          <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-2xl bg-card p-8 shadow-soft transition-transform hover:-translate-y-1">
            <c.icon className="size-6 text-primary" />
            <h2 className="type-sub mt-5">{c.title}</h2>
            <p className="type-body mt-2 text-muted-foreground">{c.text}</p>
          </a>
        ))}
      </section>
    </>
  );
}
