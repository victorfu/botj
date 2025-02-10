import { createRoot } from "react-dom/client";
import { createHashRouter, redirect } from "react-router-dom";
import HomePage from "./pages/home-page";
import SettingsPage from "./pages/settings-page";
import LoginPage from "./pages/login-page";

import { Layout } from "./components/layout";
import { loginAction } from "./actions";
import { loginLoader, protectedLoader, rootLoader } from "./loaders";
import { AuthProvider } from "./components/auth-provider";
import { authService } from "./auth/auth-service";
import CaptureOverlay from "./components/capture-overlay";
import React, { useState, useEffect } from "react";

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
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "settings",
        loader: protectedLoader,
        Component: SettingsPage,
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

const App: React.FC = () => {
  return <div>{/* Your existing app content */}</div>;
};

export default App;
