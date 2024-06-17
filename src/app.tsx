import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";
import SettingsPage from "./pages/settings-page";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
