import type { FC, SVGProps } from "react";
import { NavLink } from "react-router";

import { chakra } from "@chakra-ui/react";

interface NavbarElementProps {
  link: string;
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export const NavbarElement = ({ link, name, icon: Icon }: NavbarElementProps) => {
  return (
    <chakra.div
      as={NavLink}
      // @ts-ignore
      to={link}
      alignItems="center"
      display="grid"
      justifyItems="center"
      borderRadius="8px"
      padding="8px"
      gap="4px"
      color="rgba(255, 255, 255, 0.6)"
      css={{
        '@media (any-hover: hover)': {
          transition: 'background-color 0.4s ease-out',

          '&:hover': {
            transition: 'background-color 0.2s ease-in',
            bgColor: 'rgba(87, 92, 112, 0.3)'
          }
        },
        '&:active': {
          bgColor: 'rgba(87, 92, 112, 0.3)'
        }
      }}
      _currentPage={{
        '&.active': {
          color: '#FFBF3E',
          fill: '#FFBF3E',
        }
      }}
    >
      <Icon width="28" height="28" />
      <chakra.text fontSize="10px" lineHeight="16px">{name}</chakra.text>
    </chakra.div>
  )
}