import type { ReactNode } from "react";
import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

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

// Render framework components as plain elements for focused component tests in jsdom.
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, preload, sizes, ...rest }: Record<string, unknown>) => {
    const url = typeof src === "string" ? src : (src as { src: string }).src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={alt as string} {...rest} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));
