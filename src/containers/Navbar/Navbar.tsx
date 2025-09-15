import type { FC, SVGProps } from 'react'

import { chakra } from '@chakra-ui/react'
import { NavLink, NavLinkProps } from 'react-router-dom'

import ActiveAuctionsIcon from '$/assets/ActiveAuctions.svg?react'
import EndIcon from '$/assets/countdownTimer.svg?react'
import MedalIcon from '$/assets/medal.svg?react'
import PlusIcon from '$/assets/plus.svg?react'
import StarIcon from '$/assets/star.svg?react'
import { useTelegram } from '$/hooks/useTelegram'

const modules = [
  {
    'link': '/active',
    'name': 'Активные аукционы',
    'id': 1,
    'icon': ActiveAuctionsIcon
  },
  {
    'link': '/saved',
    'name': 'Избранное',
    'id': 2,
    'icon': StarIcon
  },
  {
    'link': '/win',
    'name': 'Победы',
    'id': 3,
    'icon': MedalIcon
  },
  {
    'link': '/end',
    'name': 'Завершенные',
    'id': 4,
    'icon': EndIcon
  }
]

interface NavbarElementProps {
  link: string;
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

const NavbarElement = ({ link, name, icon: Icon }: NavbarElementProps) => {
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

          '@media screen and (min-width: 48em)': {
            bgColor: 'rgba(87, 92, 112, 0.3)'
          }
        }
      }}
    >
      <Icon width="28" height="28" />
      <chakra.text fontSize="10px" lineHeight="16px">{name}</chakra.text>
    </chakra.div>
  )
}

export const Navbar = () => {
  const { showAlert } = useTelegram();

  const handleClick = () => {
    showAlert('ваш пенис уменьшен');
  };
  
  return (
    <chakra.nav
      display="flex"
      justifyContent="space-evenly"
      bgColor="black"
      alignSelf="start"
      gridColumn="1 / -1"
      gridRowEnd="-1"
      position="sticky"
      inset="auto auto 0"
      zIndex="1"
    >
      {modules.map((item) => (
        <NavbarElement 
          key={item.id}
          link={item.link} 
          name={item.name} 
          icon={item.icon}
        />
      ))}
      <chakra.div
        onClick={handleClick}
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

            '@media screen and (min-width: 48em)': {
              bgColor: 'rgba(87, 92, 112, 0.3)'
            }
          }
        }}
      >
        <PlusIcon width="28" height="28" />
        <chakra.text fontSize="10px" lineHeight="16px">Предложить аукцион</chakra.text>
      </chakra.div>
    </chakra.nav>
  )
}