import { FC } from 'react';

interface IFaceRecognitionProps {
    imageUrl: string;
}

// I need to add a 'bounding-box' className after
// 'inputimage' id.
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
