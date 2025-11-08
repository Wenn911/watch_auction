import { AppText } from '$/components/AppText';

export const HowItWorks = () => {
    return (
        <div className="grid gap-12 rounded-lg bg-[rgba(87,92,112,0.3)] p-12">
            <AppText
                className="text-(--primary)"
                size="L"
                variant="semibold"
                text="Как это работает?"
            />
            <AppText
                size="M"
                text="Всего 4 простых шага до вашей новой покупки или успешной продажи."
            />
            <div className="ml-24 flex flex-col">
                <ol className="flex list-decimal flex-col gap-12 text-(--primary)">
                    <li>
                        <AppText
                            size="M"
                            text="Откройте приложение"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Начните прямо сейчас, не выходя из Telegram. Никаких скачиваний и долгих регистраций."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Выберите лот"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Изучите каталог с подробными описаниями, фотографиями и историей лотов. Участвуйте в текущих аукционах."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Сделайте ставку"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Установите свою цену всего в одно нажатие. Получайте уведомления, если вашу ставку перебили."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Победите и получите"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Выиграйте аукцион и завершите сделку с продавцом безопасно и конфиденциально при нашем содействии."
                        />
                    </li>
                </ol>
            </div>
        </div>
    );
};
