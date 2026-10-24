import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const { add } = vi.hoisted(() => ({ add: vi.fn() }));
vi.mock("@/lib/cart", () => ({ useCart: () => ({ add }) }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); add.mockClear(); });

it("schedules the added feedback reset at exactly 1.5 seconds", () => {
  vi.useFakeTimers();
  const timer = vi.spyOn(globalThis, "setTimeout");
  const product = products[0];
  if (!product) throw new Error("Catalog fixture missing");
  render(<ProductCard product={product} />);
  fireEvent.click(screen.getByRole("button"));
  expect(timer).toHaveBeenLastCalledWith(expect.any(Function), 1500);
  act(() => { vi.advanceTimersByTime(1500); });
  expect(vi.getTimerCount()).toBe(0);
});

it("adds the selected card's product and its first size to the request list", () => {
  const product = products[0];
  if (!product) throw new Error("Catalog fixture missing");
  render(<ProductCard product={product} />);
  fireEvent.click(screen.getByRole("button"));
  expect(add).toHaveBeenCalledExactlyOnceWith("cold-pressed-mustard-oil", "500 ml");
});