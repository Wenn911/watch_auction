import SmileIcon from '../../../public/smile.svg';

import { AppText } from '../AppText';

interface EmptyProps {
    text: string;
}

export const Empty = ({ text }: EmptyProps) => {
    return (
        <div className="grid justify-center justify-items-center gap-16">
            <SmileIcon
                width="24"
                height="24"
            />
            <AppText
                text={text}
                size="M"
            />
        </div>
    );
};
