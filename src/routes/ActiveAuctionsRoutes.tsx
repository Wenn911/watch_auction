import type { RouteObject } from "react-router";

export const activeAuctionsRoutes: RouteObject = {
  path: "active",
  children: [
    {
      index: true,
      lazy: async () => {
        const { PageActiveAuctions } = await import("$/pages/PageActiveAuctions/PageActiveAuctions")

        return {
          Component: PageActiveAuctions
        }
      }
    },
    {
      path: ":id",
      element: <div>тут аукцион внутри</div>
    }
  ]
}