import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, jest } from "@jest/globals";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { CartProvider, useCart } from "@/lib/cart";

function CartSnapshot() {
  const { items } = useCart();
  return <output data-testid="cart-snapshot">{JSON.stringify(items)}</output>;
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  jest.useRealTimers();
});

function renderProductCard() {
  const product = products[0];
  if (!product) throw new Error("Catalog fixture missing");
  render(
    <CartProvider>
      <ProductCard product={product} />
      <CartSnapshot />
    </CartProvider>,
  );
}

it("schedules the added feedback reset at exactly 1.5 seconds", () => {
  jest.useFakeTimers();
  const timer = jest.spyOn(globalThis, "setTimeout");
  renderProductCard();
  fireEvent.click(screen.getByRole("button"));
  expect(timer).toHaveBeenLastCalledWith(expect.any(Function), 1500);
  act(() => {
    jest.advanceTimersByTime(1500);
  });
  expect(jest.getTimerCount()).toBe(0);
});

it("adds the selected card's product and its first size to the request list", () => {
  renderProductCard();
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByTestId("cart-snapshot").textContent).toBe(
    JSON.stringify([{ slug: "cold-pressed-mustard-oil", size: "500 ml", qty: 1 }]),
  );
});
