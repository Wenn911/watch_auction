import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { chakra } from "@chakra-ui/react"

import BackButtonIcon from "$/assets/backButton.svg?react"; 
import LogoIcon from "$/assets/logo.svg?react"; 

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const showBackButton = useMemo(() => 
    (!/\/(active)$/gi.test(pathname)),
  [pathname]);

  const goBack = () => navigate(-1);

  return (
    <chakra.div
      display="flex"
      gap="12px"
      padding="12px 24px"
      alignItems="center" 
      borderBottom="1px solid rgba(255, 255, 255, 0.2)"
    >
      <LogoIcon width="32" height="32" />
      <chakra.button
        visibility={showBackButton ? 'visible' : 'hidden'}
        display="flex"
        gap="8px"
        textDecoration="none"
        onClick={goBack}
        alignItems="center"
      >
        <BackButtonIcon />
        <chakra.text 
          fontSize="16px"
          lineHeight="24px"
          fontWeight="500"
        >
          Назад
        </chakra.text>
      </chakra.button>
    </chakra.div>
  )
}