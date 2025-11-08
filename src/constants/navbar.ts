import AboutIcon from '@/public/about.svg';
import ActiveAuctionsIcon from '@/public/activeAuctions.svg';
import EndIcon from '@/public/endAuctions.svg';
import MedalIcon from '@/public/medal.svg';

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
