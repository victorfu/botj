import {
  Outlet,
  useRouteLoaderData,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { User } from "firebase/auth";

function AuthStatus() {
  // The id "root" needs to match the id in the router configuration
  const rootData = useRouteLoaderData("root") as {
    user: User | null;
  };
  const fetcher = useFetcher();

  if (!rootData?.user) {
    return null;
  }

  const isLoggingOut = fetcher.formData != null;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>{rootData.user?.email}!</div>
      <fetcher.Form method="post" action="/logout">
        <button
          type="submit"
          disabled={isLoggingOut}
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </div>
  );
}

export function Layout() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end">
        <AuthStatus />
      </div>

      <Outlet />
    </div>
  );
}
