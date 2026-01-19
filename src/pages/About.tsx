import { AppText } from '$/components/AppText';
import { HowItWorks, Info, Security, WhatIsIt, WhyUs } from '$/containers/About';

export default function AboutPage() {
    return (
        <section className="grid gap-24">
            <AppText
                size="L"
                text="О проекте"
                variant="semibold"
            />
            <Info />
            <WhatIsIt />
            <HowItWorks />
            <WhyUs />
            <Security />
        </section>
    );
}
