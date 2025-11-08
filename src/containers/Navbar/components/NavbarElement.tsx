import type { FC, SVGProps } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AppText } from '$/components/AppText';

interface NavbarElementProps {
    link: string;
    name: string;
    icon: FC<SVGProps<SVGSVGElement>>;
}

export const NavbarElement = ({ link, name, icon: Icon }: NavbarElementProps) => {
    const pathname = usePathname();
    const isActive = pathname.startsWith(link);

    return (
        <Link
            className={`grid items-center justify-items-center gap-4 rounded-lg p-8 transition-colors duration-400 ease-out hover:bg-gray-600/30 hover:transition-colors hover:duration-200 hover:ease-in active:bg-gray-600/30 active:text-(--primary) ${isActive ? 'text-(--primary)' : 'text-white/60'}`}
            href={link}
        >
            <Icon
                height="28"
                width="28"
            />
            <AppText text={name} />
        </Link>
    );
};
