import type { RouteObject } from "react-router";

export const victoryAuctionsRoutes: RouteObject = {
  path: "win",
  children: [
    {
      index: true,
      lazy: async () => {
        const { PageVictoryAuctions } = await import("$/pages/PageVictoryAuctions/PageVictoryAuctions")

        return {
          Component: PageVictoryAuctions
        }
      }
    },
    {
      path: ":id",
      element: <div>тут аукцион внутри</div>
    }
  ]
}