import { chakra } from "@chakra-ui/react"

import { AppText } from "$/components/AppText"
import { ActiveAuctions } from "$/containers/ActiveAuctions"

export const PageActiveAuctions = () => {
  return (
    <chakra.div display="grid" gap="32px">
      <AppText text="Активные аукционы" size="L" variant="semibold" />
      <ActiveAuctions />
    </chakra.div> 
  )
}
