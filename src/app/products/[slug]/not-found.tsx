import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-40 md:px-8">
      <h1 className="type-heading">Product not found</h1>
      <Link href="/" className="type-label mt-6 inline-block text-primary underline">Back to home</Link>
    </div>
  );
}
