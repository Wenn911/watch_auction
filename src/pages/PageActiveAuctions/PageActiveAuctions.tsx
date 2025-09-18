import { chakra } from "@chakra-ui/react"

import { ActiveAuctions } from "$/containers/ActiveAuctions/ActiveAuctions"

export const PageActiveAuctions = () => {
  return (
    <chakra.div display="grid" gap="32px">
      <chakra.text 
        fontSize="32px"
        lineHeight="48px"
        fontWeight="600"
      >
        Активные аукционы
      </chakra.text>
      <ActiveAuctions />
    </chakra.div> 
  )
}
