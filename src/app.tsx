import { createRoot } from "react-dom/client";
import { createHashRouter, Link, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: (
      <div>
        About Page <Link to="/">Home</Link>
      </div>
    ),
  },
]);

const root = createRoot(document.body);
root.render(<RouterProvider router={router} />);
