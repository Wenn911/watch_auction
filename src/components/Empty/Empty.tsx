import type { ComponentProps } from 'react';

import { chakra } from '@chakra-ui/react';

import SmileIcon from '$/assets/smile.svg?react';

import { AppText } from '../AppText';

interface EmptyProps extends ComponentProps<typeof chakra.div> {
  text: string
}

export const Empty = ({ text, ...otherProps }: EmptyProps) => {
  return (
    <chakra.div 
      display="grid"
      gap="16px"
      justifyContent="center"
      justifyItems="center"
      {...otherProps}
    >
      <SmileIcon width="24" height="24" />
      <AppText text={text} size="M" />  
    </chakra.div>
  )
}