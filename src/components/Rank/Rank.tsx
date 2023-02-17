import { FC } from 'react';

interface IRankProps{
  name?: string,
  entries: number
}

const Rank: FC<IRankProps> = ({name, entries}) => {
  return (
    <div>
      <div className='white f3 mt2'>
        {`${name}, your current rank is `}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank
