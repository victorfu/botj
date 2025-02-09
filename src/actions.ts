import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authService } from "./auth/auth-service";

export async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  try {
    await authService.signIn(username, password);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}
