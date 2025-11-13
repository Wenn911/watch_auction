import { AppInput } from "$/components/AppInput"
import { AppText } from "$/components/AppText"

export const Bids = () => {
    return (
        <div className="flex w-full flex-col gap-24 rounded-lg bg-(--bg-primary) p-10">
            <div className='flex flex-col gap-12'>
                <AppInput placeholder="10000$" />
                <div className="flex gap-4">
                    <AppText className="flex items-center py-4 px-8 bg-(--button-primary) rounded-xl" size="XS" text="240$" />
                    <AppText className="flex items-center py-4 px-8 bg-(--button-primary) rounded-xl" size="XS" text="350$" />
                    <AppText className="flex items-center py-4 px-8 bg-(--button-primary) rounded-xl" size="XS" text="480$" />
                </div>
            </div>
            <div className="flex gap-16 justify-between">
                <button 
                    className="flex w-full items-center justify-center py-8 px-4 mt-16 rounded-xl bg-(--button-primary)"
                >
                    Поставить ставку
                </button>
                <button
                    className="flex w-full items-center justify-center py-8 mt-16 rounded-xl bg-(--button-primary)"
                >
                    Еще кнопка
                </button>
            </div>
        </div>
    )
}