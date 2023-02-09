import { FC } from 'react';

interface IFaceRecognitionProps {
    imageUrl: string;
}

const FaceRecognition: FC<IFaceRecognitionProps> = ({ imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
            <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        </div>
        </div> 
    );
}

export default FaceRecognition
