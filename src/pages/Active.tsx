import { AppText } from '$/components/AppText';
import { ActiveAuctions } from '$/containers/ActiveAuctions';

export default function ActivePage() {
    return (
        <div className="grid gap-16">
            <AppText
                size="L"
                text="Активные аукционы"
                variant="semibold"
            />
            <ActiveAuctions />
        </div>
    );
}
