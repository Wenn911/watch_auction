'use client';

import { AppText } from '$/components/AppText';
import { useTelegram } from '$/hooks/useTelegram';

import AboutIcon from '../../../public/about.svg';
import ActiveAuctionsIcon from '../../../public/activeAuctions.svg';
import EndIcon from '../../../public/endAuctions.svg';
import MedalIcon from '../../../public/medal.svg';
import PlusIcon from '../../../public/plus.svg';

import { NavbarElement } from './components';

const modules = [
    {
        link: '/active',
        name: 'Активные',
        id: 1,
        icon: ActiveAuctionsIcon
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
        icon: MedalIcon
    },
    {
        link: '/end',
        name: 'Завершенные',
        id: 4,
        icon: EndIcon
    },
    {
        link: '/about',
        name: 'О проекте',
        id: 5,
        icon: AboutIcon
    }
];

export const Navbar = () => {
    const { showAlert } = useTelegram();

    const handleClick = () => {
        showAlert('asdasd');
    };

    return (
        <nav
            className="flex justify-evenly bg-black self-start col-start-1 -col-end-1 -row-end-1 sticky bottom-0 z-10"
        >
            {modules.map((item) => (
                <NavbarElement
                    key={item.id}
                    link={item.link}
                    name={item.name}
                    icon={item.icon}
                />
            ))}
            <div
                onClick={handleClick}
                className="flex flex-col items-center justify-center rounded-lg
                p-8 gap-4 text-white/60 hover:bg-gray-600/30 active:bg-gray-600/30 transition-colors duration-200 ease-in group"
            >
                <PlusIcon width="28" height="28" />
                <AppText text="Предложить" />
            </div>
        </nav>
    );
};
