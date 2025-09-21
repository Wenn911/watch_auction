import type { ComponentProps, ComponentType } from "react";
import { useMemo } from "react";

import { chakra } from "@chakra-ui/react"

interface AppTextProps {
  size?: "S" | "M" | "L";
  variant?: "default" | "medium" | "semibold"
  text: string;
}

type ChakraTextProps = ComponentProps<typeof chakra.text>;
type AppTextCompleteProps = AppTextProps & Omit<ChakraTextProps, keyof AppTextProps>;

export const AppText = (props: AppTextCompleteProps) => {
  const { size = "S", variant = "default", text, ...otherProps } = props
  const selectedSize = useMemo(() => {
    if (size === 'M') {
      return {
        fontSize: '16px',
        lineHeight: '24px'
      }
    }
    if (size === 'L') {
      return {
        fontSize: '32px',
        lineHeight: '48px'
      }
    }

    return {
      fontSize: '10px',
      lineHeight: '18px'
    }
  }, [size])

  const selectedVariant = useMemo(() => {
    if (variant === 'medium') {
      return '500'
    }
    if (variant === 'semibold') {
      return '600'
    }

    return '400'
  }, [variant])

  return (
    <chakra.text
      fontSize={selectedSize.fontSize}
      lineHeight={selectedSize.lineHeight}
      fontWeight={selectedVariant}
      {...otherProps}
    >
      {text}
    </chakra.text>
  )
}