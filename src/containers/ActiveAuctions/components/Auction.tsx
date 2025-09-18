import { Link } from "react-router";

import { chakra } from "@chakra-ui/react";

import type { AuctionData } from "$/types/auction.types";

export const Auction = ({ auction }: { auction: AuctionData }) => {
  const { id, name, startDt, startPrice, image } = auction

  return (
    <chakra.div
      as={Link}
      // @ts-ignore
      to={id}
      display="flex"
      gap="12px"
      backgroundColor="rgba(29, 29, 29)"
      padding="12px"
      borderRadius="8px"
    >
      <chakra.img src={image} width="160px" height="160px" borderRadius="16px" />
      <chakra.div display="grid" gap="8px">
        <chakra.text
          fontSize="24px"
          lineHeight="32px" 
          fontWeight="600"
        >
          {name}
        </chakra.text>
        <chakra.div
          display="flex"
          justifyContent="space-between"
          gap="8px"
        >
          <chakra.div 
            display="grid"
            alignContent="center"
            justifyItems="center"
          >
            <chakra.text
              fontSize="14px"
              lineHeight="20px"
              fontWeight="500"
              textAlign="center"
              color="rgba(255, 255, 255, 1)"
            >
              Стартовая цена
            </chakra.text>
            <chakra.text
              fontSize="14px"
              lineHeight="20px"
              color="rgba(255, 255, 255, 0.8)"
            >
              {startPrice}
            </chakra.text>
          </chakra.div>
          <chakra.div
            display="grid"
            alignContent="center"
            justifyItems="center"
          >
            <chakra.text
              fontSize="14px"
              lineHeight="20px"
              fontWeight="500"
              textAlign="center"
              color="rgba(255, 255, 255, 1)"
            >
              До начала аукциона
            </chakra.text>
            <chakra.text
              fontSize="14px"
              lineHeight="20px"
              color="rgba(255, 255, 255, 0.8)"
            >
              {startDt}
            </chakra.text>
          </chakra.div>
        </chakra.div>
      </chakra.div>
    </chakra.div> 
  )
}