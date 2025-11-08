import { AppText } from '$/components/AppText';
import { HowItWorks, Info, Security, WhatIsIt, WhyUs } from '$/containers/About';

const AboutPage = async () => {
    return (
        <section className="grid gap-24 px-24">
            <AppText
                size="L"
                variant="semibold"
                text="О проекте"
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
