import { AppText } from "$/components/AppText";
import { EndAuctions } from "$/containers/EndAuctions";

export default async function EndAuctionsPage() {
  return (
    <div className="grid gap-32">
        <AppText text="Активные аукционы" size="L" variant="semibold" />
        <EndAuctions />
    </div>
  );
}
