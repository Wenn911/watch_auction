import { chakra } from "@chakra-ui/react"

import LogoIcon from "$/assets/logo.svg?react"; 

export const Header = () => {
  return (
    <chakra.div
      display="flex"
      gap="12px"
      padding="12px 24px"
      alignItems="center" 
      borderBottom="1px solid rgba(255, 255, 255, 0.2)"
    >
      <LogoIcon width="32" height="32" />
      <chakra.text
        fontSize="16px"
        lineHeight="24px" 
        fontWeight="500"
      >
        ChronoPenis
      </chakra.text>
    </chakra.div>
  )
}