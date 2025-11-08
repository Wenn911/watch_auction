import { AppText } from '$/components/AppText';
import Image from 'next/image';

export const Info = () => {
    return (
        <div className="grid gap-12 rounded-lg bg-[rgba(87,92,112,0.3)] p-12">
            <Image
                alt="header"
                className="w-full rounded-lg"
                height="0"
                src="/logo.png"
                width="0"
            />
            <AppText
                className="text-(--primary)"
                size="M"
                text="Ваш аукцион роскоши — в телеграме"
                variant="semibold"
            />
            <AppText
                size="M"
                text="Элитные часы и ювелирные изделия с молотка."
            />
            <AppText
                size="M"
                text="Покупайте и продавайте с удовольствием и выгодой прямо в мессенджере."
            />
        </div>
    );
};
