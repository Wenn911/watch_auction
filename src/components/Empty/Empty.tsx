import SmileIcon from '../../../public/smile.svg';

import { AppText } from '../AppText';

interface EmptyProps {
  text: string
}

export const Empty = ({ text }: EmptyProps) => {
  return (
    <div className='grid gap-16 justify-center justify-items-center'>
      <SmileIcon width="24" height="24" />
      <AppText text={text} size="M" />  
    </div>
  )
}