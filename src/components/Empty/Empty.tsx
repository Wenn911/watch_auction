import SmileIcon from '../../../public/smile.svg';

import { AppText } from '../AppText';

interface EmptyProps {
    text: string;
}

export const Empty = ({ text }: EmptyProps) => {
    return (
        <div className="grid justify-center justify-items-center gap-16">
            <SmileIcon
                height="24"
                width="24"
            />
            <AppText
                size="M"
                text={text}
            />
        </div>
    );
};
