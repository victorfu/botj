import { RouterProvider } from "react-router-dom";
import "../auth/auth-state"; // Just import to ensure it's initialized

export function AuthProvider({ router }: { router: any }) {
  return <RouterProvider router={router} />;
}
