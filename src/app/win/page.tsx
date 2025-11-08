import { AppText } from '$/components/AppText';
import { VictoryAuctions } from '$/containers/VictoryAuctions';

export default async function VictoryAuctionsPage() {
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
