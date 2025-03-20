import { AuthCard } from "@daveyplate/better-auth-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/$pathname")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = Route.useParams();

  return (
    <main className="flex grow flex-col items-center justify-center p-4">
      <AuthCard pathname={pathname} />
    </main>
  );
}
