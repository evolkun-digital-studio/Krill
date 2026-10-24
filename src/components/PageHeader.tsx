import Image, { type StaticImageData } from "next/image";
import { Reveal } from "./Reveal";

export function PageHeader({ title, text, image, alt }: { title: string; text: string; image?: StaticImageData; alt?: string }) {
  if (!image) {
    return (
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-36 md:px-8 md:pt-44">
        <Reveal className="max-w-2xl">
          <h1 className="type-heading">{title}</h1>
          <p className="type-body mt-4 text-muted-foreground">{text}</p>
        </Reveal>
      </section>
    );
  }
  return (
    <section className="px-3 pt-24 md:px-5">
      <div className="relative overflow-hidden rounded-3xl">
        <Image src={image} alt={alt ?? title} fill preload sizes="100vw" className="ken-burns object-cover" />
        <div className="hero-overlay absolute inset-0" aria-hidden />
        <div className="relative mx-auto flex min-h-[60svh] max-w-7xl items-end px-5 py-14 md:px-8">
          <div className="max-w-2xl text-on-dark">
            <h1 className="type-heading rise-in">{title}</h1>
            <p className="type-body rise-in mt-4 text-on-dark/90">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
