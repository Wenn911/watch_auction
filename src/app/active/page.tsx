import { AppText } from "$/components/AppText";
import { ActiveAuctions } from "$/containers/ActiveAuctions";

export default async function ActiveAuctionsPage() {
    return (
        <div className="grid gap-32 px-24">
            <AppText text="Активные аукционы" size="L" variant="semibold" />
            <ActiveAuctions />
        </div>
    );
}
