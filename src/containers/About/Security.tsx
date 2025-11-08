import { AppText } from '$/components/AppText';

export const Security = () => {
    return (
        <div className="grid gap-12 rounded-lg bg-[rgba(87,92,112,0.3)] p-12">
            <AppText
                className="text-(--primary)"
                size="L"
                variant="semibold"
                text="Безопасность — наш приоритет"
            />
            <AppText
                size="M"
                variant="semibold"
                text="Мы понимаем, что имеем дело с ценными активами. Поэтому мы внедрили многоуровневую систему защиты:"
            />
            <div className="ml-24 flex flex-col">
                <ul className="flex list-disc flex-col gap-12 text-(--primary)">
                    <li>
                        <AppText
                            size="M"
                            text="Предварительная проверка лотов"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Каждый предмет перед попаданием в каталог проходит базовую верификацию."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Прозрачность сделки"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Четкие правила аукциона и условия оплаты."
                        />
                    </li>
                    <li>
                        <AppText
                            size="M"
                            text="Поддержка на каждом этапе"
                        />
                        <AppText
                            size="M"
                            className="text-white"
                            text="Наша служба заботы поможет разрешить любые вопросы между покупателем и продавцом."
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};
