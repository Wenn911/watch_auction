import { AppText } from "$/components/AppText";
import { VictoryAuctions } from "$/containers/VictoryAuctions";

export default async function VictoryAuctionsPage() {
    return (
        <div className="grid gap-32">
            <AppText text="Выигранные аукционы" size="L" variant="semibold" />
            <VictoryAuctions />
        </div>
    );
}
