import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/agro")({
  beforeLoad: () => {
    throw redirect({ to: "/handicraft", statusCode: 301 });
  },
});
