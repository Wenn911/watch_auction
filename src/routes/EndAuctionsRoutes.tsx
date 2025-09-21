import type { RouteObject } from "react-router";

export const endAuctionsRoutes: RouteObject = {
  path: "end",
  children: [
    {
      index: true,
      lazy: async () => {
        const { PageEndAuctions } = await import("$/pages/PageEndAuctions/PageEndAuctions")

        return {
          Component: PageEndAuctions
        }
      }
    },
    {
      path: ":id",
      element: <div>тут аукцион внутри</div>
    }
  ]
}