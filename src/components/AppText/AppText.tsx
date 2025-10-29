import { useMemo } from "react";

interface AppTextProps {
  size?: "S" | "M" | "L";
  variant?: "default" | "medium" | "semibold"
  text: string;
}

export const AppText = (props: AppTextProps) => {
  const { size = "S", variant = "default", text } = props
  const selectedSize = useMemo(() => {
    if (size === 'M') {
      return {
        fontSize: 'text-base',
        lineHeight: 'leading-6'
      }
    }
    if (size === 'L') {
      return {
        fontSize: 'text-3xl',
        lineHeight: 'leading-[48px]'
      }
    }

    return {
      fontSize: 'text-xs',
      lineHeight: 'leading-[18px]'
    }
  }, [size])

  const selectedVariant = useMemo(() => {
    if (variant) {
      return 'font-' + variant;
    }

    return 'font-normal'
  }, [variant])

  return (
    <p className={`${selectedSize.fontSize} ${selectedSize.lineHeight} ${selectedVariant}`}>
      {text}
    </p>
  )
}