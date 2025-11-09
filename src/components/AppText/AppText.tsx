import type { HTMLAttributes } from 'react';

interface AppTextProps extends HTMLAttributes<HTMLParagraphElement> {
    size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
    variant?: 'normal' | 'medium' | 'semibold' | 'bold';
    text: string;
    className?: string;
}

export const AppText = (props: AppTextProps) => {
    const { size = 'S', variant, text, className = '', ...otherProps } = props;

    let fontSize = 'text-sm';
    let lineHeight = 'leading-[20px]';
    let fontWeight = 'font-normal';

    switch (size) {
        case 'XS':
            fontSize = 'text-xs';
            lineHeight = 'leading-[16px]';
            break;
        case 'S':
            fontSize = 'text-sm';
            lineHeight = 'leading-[20px]';
            break;
        case 'M':
            fontSize = 'text-base';
            lineHeight = 'leading-[24px]';
            break;
        case 'L':
            fontSize = 'text-lg';
            lineHeight = 'leading-[28px]';
            break;
        case 'XL':
            fontSize = 'text-xl';
            lineHeight = 'leading-[32px]';
            break;
        case '2XL':
            fontSize = 'text-2xl';
            lineHeight = 'leading-[36px]';
            break;
        case '3XL':
            fontSize = 'text-3xl';
            lineHeight = 'leading-[48px]';
            break;
    }

    // Обработка начертаний
    switch (variant) {
        case 'medium':
            fontWeight = 'font-medium';
            break;
        case 'semibold':
            fontWeight = 'font-semibold';
            break;
        case 'bold':
            fontWeight = 'font-bold';
            break;
        default:
            fontWeight = 'font-normal';
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