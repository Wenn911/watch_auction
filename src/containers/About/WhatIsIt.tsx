import { AppText } from '$/components/AppText';

export const WhatIsIt = () => {
    return (
        <div className="grid gap-12 rounded-lg bg-[rgba(87,92,112,0.3)] p-12">
            <AppText
                className="text-(--primary)"
                size="L"
                variant="semibold"
                text="Что это такое?"
            />
            <AppText
                size="M"
                text="Wa&Je — это уникальное онлайн-пространство для истинных ценителей.
                Мы превратили Telegram в удобную и безопасную площадку для аукционных торгов, где вы можете найти,
                приобрести или выставить на продажу эксклюзивные наручные часы и изысканные ювелирные украшения."
            />
            <AppText
                size="M"
                text="Никаких сложных регистраций и громоздких платформ. Всё происходит там, где вам удобно — в вашем любимом мессенджере."
            />
        </div>
    );
};
