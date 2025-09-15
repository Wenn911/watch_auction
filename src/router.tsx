import { createBrowserRouter, Navigate } from "react-router";

import { AppLayout } from "./layout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      hydrateFallbackElement: null,
      children: [
        {
          index: true,
          element: <Navigate replace to="/active" />
        },
        {
          path: "active",
          element: <div>active</div>
        },
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