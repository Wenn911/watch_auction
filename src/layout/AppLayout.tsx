import { Suspense } from "react"
import { Outlet } from "react-router"

import { chakra } from "@chakra-ui/react"

import { Header } from "$/containers/Header"
import { Navbar } from "$/containers/Navbar"
import { useTelegram } from "$/hooks/useTelegram"

export const AppLayout = () => {
  const { isTelegram } = useTelegram();

  if (!isTelegram) { 
    return (
      <chakra.div className="warning">
        <chakra.h2>⚠️ Это приложение предназначено для запуска в Telegram</chakra.h2>
        <chakra.text>Откройте приложение через Telegram бота для полного функционала</chakra.text>
      </chakra.div>
    ) }

  return (
    <chakra.div 
      display="grid" 
      gap="16px 24px"
      gridTemplateRows="auto 1fr auto"
      minHeight="100dvh"
      paddingTop="var(--tg-content-safe-area-inset-top)"
      paddingBottom="var(--tg-content-safe-area-inset-bottom)"
    >
      <Header />
      <Navbar />
      <chakra.main gridColumn="1 / -1" padding="0 16px 32px">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </chakra.main>
    </chakra.div>
  )
}