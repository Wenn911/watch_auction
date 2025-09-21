import { createBrowserRouter, Navigate } from "react-router";

import { AppLayout } from "./layout";
import { activeAuctionsRoutes } from "./routes/ActiveAuctionsRoutes";
import { endAuctionsRoutes } from "./routes/EndAuctionsRoutes";
import { victoryAuctionsRoutes } from "./routes/VictoryAuctionsRoutes";

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
        activeAuctionsRoutes,
        victoryAuctionsRoutes,
        endAuctionsRoutes,
        {
          path: '*',
          element: <Navigate replace to="/" />
        }
      ]
    }
  ]
)