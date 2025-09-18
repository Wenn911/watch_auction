import { createBrowserRouter, Navigate } from "react-router";

import { AppLayout } from "./layout";
import { auctionsRoutes } from "./routes/AuctionsRoutes";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      hydrateFallbackElement: null,
      children: [
        {
          index: true,
          element: <Navigate replace to="active" />
        },
        auctionsRoutes,
        {
          path: "saved",
          element: <div>saved</div>
        },
        {
          path: "win",
          element: <div>Выигранные</div>
        },
        {
          path: "end",
          element: <div>Завершенные</div>
        },
        {
          path: '*',
          element: <Navigate replace to="/" />
        }
      ]
    }
  ]
)