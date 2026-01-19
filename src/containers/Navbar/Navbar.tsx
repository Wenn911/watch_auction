import { AppText } from '$/components/AppText';
import { navbarElements } from '$/constants';
import { useTelegram } from '$/hooks';

import PlusIcon from '../../assets/plus.svg?react';

import { NavbarElement } from './components';

export const Navbar = () => {
    const { showAlert } = useTelegram();

    const handleClick = () => {
        showAlert('asdasd');
    };

    return (
        <nav className="sticky bottom-0 z-10 col-start-1 -col-end-1 -row-end-1 flex justify-evenly self-start bg-black">
            {navbarElements.map((item) => (
                <NavbarElement
                    key={item.id}
                    icon={item.icon}
                    link={item.link}
                    name={item.name}
                />
            ))}
            <div
                className="group flex flex-col items-center justify-center gap-4 rounded-lg p-8 text-white/60 transition-colors duration-200 ease-in hover:bg-gray-600/30 active:bg-gray-600/30"
                onClick={handleClick}
            >
                <PlusIcon
                    height="28"
                    width="28"
                />
                <AppText className='whitespace-pre letter-spacing 0.01em' size='XS' text="Предложить" />
            </div>
        </nav>
    );
};
