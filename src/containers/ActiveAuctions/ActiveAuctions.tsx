import { chakra } from "@chakra-ui/react"

import WatchExample from '$/assets/images/watch_example.jpg'
import type { AuctionData } from "$/types/auction.types"

import { Auction } from "./components"

const auctions: AuctionData[] = [
  {
    id: '1',
    name: 'Rolex',
    startPrice: '15 кириешек',
    startDt: '15:12:34',
    image: WatchExample,
  },
  {
    id: '2',
    name: 'AP',
    startPrice: '20 кириешек',
    image: WatchExample,
    startDt: '15:12:34'
  },
  {
    id: '3',
    name: 'VC',
    startPrice: '3 пачки чипсов лейс',
    startDt: '15:12:34',
    image: WatchExample,
  },
]

export const ActiveAuctions = () => {
  return (
    <chakra.div display="grid" gap="16px">
      {auctions.map((item) => (
        <Auction
          key={item.id} 
          auction={item}
        />
      ))}
    </chakra.div>
  )
}