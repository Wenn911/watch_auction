import { AppText } from '$/components/AppText';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../assets/backButton.svg?react';

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const showBackButton = useMemo(() => !/\/(active|win|saved|end)$/gi.test(location.pathname), [location.pathname]);

    const goBack = () => navigate(-1);

    return (
        <header className="sticky top-0 z-2 flex items-center gap-12 border-b border-white/20 bg-black px-24 py-12">
            <img
                alt="header"
                className="h-8 w-8"
                src="/logo.png"
            />
            <button
                className={`flex items-center gap-8 no-underline ${showBackButton ? 'visible' : 'invisible'}`}
                onClick={goBack}
            >
                <BackButton
                    height="24"
                    width="24"
                />
                <AppText
                    size="M"
                    text="Назад"
                    variant="medium"
                />
            </button>
        </header>
    );
};
