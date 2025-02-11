import { createRoot } from "react-dom/client";
import { createHashRouter, redirect } from "react-router-dom";
import HomePage from "./pages/home-page";
import SettingsPage from "./pages/settings-page";
import LoginPage from "./pages/login-page";

import { Layout } from "./components/layout";
import { loginAction } from "./actions";
import { loginLoader, rootLoader } from "./loaders";
import { AuthProvider } from "./components/auth-provider";
import { authService } from "./auth/auth-service";

const router = createHashRouter([
  {
    id: "root",
    path: "/",
    loader: rootLoader,
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      await authService.signOut();
      return redirect("/");
    },
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<AuthProvider router={router} />);
