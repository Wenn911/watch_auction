import { AppText } from '$/components/AppText';
import { EndAuctions } from '$/containers/EndAuctions';

export default function EndPage() {
    return (
        <div className="grid gap-32">
            <AppText
                size="L"
                text="Активные аукционы"
                variant="semibold"
            />
            <EndAuctions />
        </div>
    );
}
