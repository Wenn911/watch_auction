import { chakra } from "@chakra-ui/react"

import { Empty } from "$/components/Empty"

export const VictoryAuctions = () => {
  if (![].length) {
    return <Empty text="Вы пока нигде не выиграли" />
  }

  return (
    <chakra.div />
  )
}