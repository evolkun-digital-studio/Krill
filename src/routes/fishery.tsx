import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/fishery")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "fishery", statusCode: 301 });
  },
});
