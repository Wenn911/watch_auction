import { AppText } from '$/components/AppText';
import { HowItWorks, Info, Security, WhatIsIt, WhyUs } from '$/containers/About';

const AboutPage = async () => {
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
};

export default AboutPage;
