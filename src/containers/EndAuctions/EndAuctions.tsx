import { chakra } from "@chakra-ui/react"

import { Empty } from "$/components/Empty"

export const EndAuctions = () => {
  if (![].length) {
    return <Empty text="Здесь пока нет завершенных аукционов" />
  }

  return (
    <chakra.div />
  )
}