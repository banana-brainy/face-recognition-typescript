import { FC } from 'react';

interface IRankProps{
  name?: string,
  entries: number
}

const Rank: FC<IRankProps> = ({name, entries}) => {
  return (
    <div>
      <div className='white f3 mt2'>
        {`${name}, the number of pictures you've submitted is`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank
