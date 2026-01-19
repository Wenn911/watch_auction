import AboutIcon from '../assets/about.svg?react';
import ActiveAuctionsIcon from '../assets/activeAuctions.svg?react';
import EndIcon from '../assets/endAuctions.svg?react';
import MedalIcon from '../assets/medal.svg?react';

export const navbarElements = [
    {
        link: '/active',
        name: 'Активные',
        id: 1,
        icon: ActiveAuctionsIcon,
    },
    // {
    //   'link': '/saved',
    //   'name': 'Избранное',
    //   'id': 2,
    //   'icon': StarIcon
    // },
    {
        link: '/win',
        name: 'Победы',
        id: 3,
        icon: MedalIcon,
    },
    {
        link: '/end',
        name: 'Завершенные',
        id: 4,
        icon: EndIcon,
    },
    {
        link: '/about',
        name: 'О нас',
        id: 5,
        icon: AboutIcon,
    },
];
