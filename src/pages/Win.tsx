import { AppText } from '$/components/AppText';
import { VictoryAuctions } from '$/containers/VictoryAuctions';

export default function WinPage() {
    return (
        <div className="grid gap-32">
            <AppText
                size="L"
                text="Выигранные аукционы"
                variant="semibold"
            />
            <VictoryAuctions />
        </div>
    );
}
