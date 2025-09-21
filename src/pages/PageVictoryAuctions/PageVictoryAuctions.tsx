import { chakra } from "@chakra-ui/react"

import { AppText } from "$/components/AppText"
import { VictoryAuctions } from "$/containers/VictoryAuctions/VictoryAuctions"

export const PageVictoryAuctions = () => {
  return (
    <chakra.div display="grid" gap="32px">
      <AppText text="Выигранные аукционы" size="L" variant="semibold" />
      <VictoryAuctions />
    </chakra.div>
  )
}