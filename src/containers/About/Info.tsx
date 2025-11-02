import { AppText } from "$/components/AppText";
import Image from 'next/image';

export const Info = () => {
    return (
        <div className="grid gap-12 bg-[rgba(87,92,112,0.3)] rounded-lg p-12">
            <Image src="/logo.jpg" className="w-full rounded-lg" width="0" height="0" alt="header" />
            <AppText className="text-(--primary)" size="M" variant="semibold" text="Ваш аукцион роскоши — в телеграме" />
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
