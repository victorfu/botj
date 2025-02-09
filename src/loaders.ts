import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { waitForAuthReady } from "./auth/auth-state";
import { authService } from "./auth/auth-service";
export async function rootLoader() {
  await waitForAuthReady();

  return { user: authService.user };
}

export async function loginLoader() {
  await waitForAuthReady();

  if (authService.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export async function protectedLoader({ request }: LoaderFunctionArgs) {
  await waitForAuthReady();

  if (!authService.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
