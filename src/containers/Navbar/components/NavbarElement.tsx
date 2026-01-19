import type { FC, SVGProps } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppText } from '$/components/AppText';

interface NavbarElementProps {
    link: string;
    name: string;
    icon: FC<SVGProps<SVGSVGElement>>;
}

export const NavbarElement = ({ link, name, icon: Icon }: NavbarElementProps) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(link);

    return (
        <Link
            className={`grid items-center justify-items-center gap-4 rounded-lg p-8 transition-colors duration-400 ease-out hover:bg-gray-600/30 hover:transition-colors hover:duration-200 hover:ease-in active:bg-gray-600/30 active:text-(--primary) ${isActive ? 'text-(--primary)' : 'text-white/60'}`}
            to={link}
        >
            <Icon
                height="28"
                width="28"
            />
            <AppText className='whitespace-pre letter-spacing 0.01em' size='XS' text={name} />
        </Link>
    );
};
