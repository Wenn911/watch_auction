import { Suspense } from "react"
import { Outlet } from "react-router"

import { chakra } from "@chakra-ui/react"

import { Navbar } from "$/containers/Navbar"

export const AppLayout = () => {
  return (
    <chakra.div 
      display="grid" 
      gap="16px 24px"
      gridTemplateRows="auto 1fr auto"
      minHeight="100dvh"
      paddingTop="var(--tg-content-safe-area-inset-top)"
      paddingBottom="var(--tg-content-safe-area-inset-bottom)"
    >
      <chakra.div display="flex" justifyContent="center">
        <chakra.div>ChronoPenis</chakra.div>
      </chakra.div>
      <Navbar />
      <chakra.main gridColumn="1 / -1" paddingBottom="32px">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </chakra.main>
    </chakra.div>
  )
}