import { AppText } from '$/components/AppText';

export const WhyUs = () => {
    return (
        <div className="grid gap-12 rounded-lg bg-[rgba(87,92,112,0.3)] p-12">
            <AppText
                className="text-(--primary)"
                size="L"
                variant="semibold"
                text="Почему выбирают нас?"
            />
            <div className="ml-24 flex flex-col">
                <ul className="flex list-disc flex-col gap-12 text-(--primary)">
                    <li>
                        <AppText
                            size="M"
                            text="Доступ к роскоши"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="В нашем каталоге только проверенные, аутентичные лоты — от культовых марок часов до уникальных ювелирных изделий."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Мгновенность"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Все уведомления о ставках и результатах аукционов приходят вам в Telegram. Вы всегда в курсе событий."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Простота"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Интуитивно понятный интерфейс. Сделать ставку так же просто, как отправить сообщение."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Конфиденциальность"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Мы уважаем вашу приватность. Все сделки проходят с максимальным уровнем discretion."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Экспертное сообщество"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Присоединяйтесь к кругу знатоков и коллекционеров. Мы тщательно проверяем продавцов."
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};
