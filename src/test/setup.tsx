import type { ReactNode } from "react";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Vite resolves image imports to URL strings, while next/image expects Next's build-time
// image metadata; render plain elements so components can be tested in jsdom.
vi.mock("next/image", () => ({
  default: ({ src, alt, fill, preload, sizes, ...rest }: Record<string, unknown>) => {
    const url = typeof src === "string" ? src : (src as { src: string }).src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={alt as string} {...rest} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));
