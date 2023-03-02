import { FC } from 'react';
import './FaceDetection.css';

interface IFaceDetectionProps {
    displayBox: boolean,
    imageUrl: string,
    box: {
        topRow: number,
        rightCol: number,
        bottomRow: number,
        leftCol: number;
    }
}

const FaceDetection: FC<IFaceDetectionProps> = ({ imageUrl, box, displayBox }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
            <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
            {displayBox && (<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>)}
            </div>
        </div> 
    );
}

export default FaceDetection
