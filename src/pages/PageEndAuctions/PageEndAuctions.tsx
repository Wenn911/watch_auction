import { chakra } from "@chakra-ui/react"

import { AppText } from "$/components/AppText"
import { EndAuctions } from "$/containers/EndAuctions"

export const PageEndAuctions = () => {
  return (
    <chakra.div display="grid" gap="32px">
      <AppText text="Завершённые аукционы" size="L" variant="semibold" />
      <EndAuctions />
    </chakra.div>
  )
}