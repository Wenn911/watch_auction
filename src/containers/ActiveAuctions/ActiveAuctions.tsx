import { getWatches } from "$/api"

import { ActiveAuction } from "./components"

export const ActiveAuctions = async () => {
  const allItems = await getWatches();

  // if (isLoading) return <Skeleton width="100%" height="100%" />

  // if (!data) return null

  return (
    <div className="grid gap-16">
      {allItems.map((item) => (
        <ActiveAuction
          key={item.id} 
          auction={item}
        />
      ))}
    </div>
  )
}