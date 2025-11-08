import type { HTMLAttributes } from 'react';

interface AppTextProps extends HTMLAttributes<HTMLParagraphElement> {
    size?: 'S' | 'M' | 'L';
    variant?: 'normal' | 'medium' | 'semibold';
    text: string;
    className?: string;
}

export const AppText = (props: AppTextProps) => {
    const { size = 'S', variant, text, className = '', ...otherProps } = props;

    let fontSize = 'text-xs';
    let lineHeight = 'leading-[18px]';
    let fontWeight = 'font-normal';

    if (size === 'M') {
        fontSize = 'text-base';
        lineHeight = 'leading-[24px]';
    } else if (size === 'L') {
        fontSize = 'text-3xl';
        lineHeight = 'leading-[48px]';
    }

    if (variant === 'medium') {
        fontWeight = 'font-medium';
    } else if (variant === 'semibold') {
        fontWeight = 'font-semibold';
    }

    const combinedClassName = `${fontSize} ${lineHeight} ${fontWeight} ${className}`.trim();

    return (
        <p
            className={combinedClassName}
            {...otherProps}
        >
            {text}
        </p>
    );
};
