import { FC } from 'react';

interface IRankProps{

}

const Rank: FC<IRankProps> = (props) => {
  return (
    <div>
        <div className='white f3 mt2'>
            {'Your current rank is...'}
        </div>
        <div className='white f1'>
            {'#7'}
        </div>
    </div>
  );
}

export default Rank
