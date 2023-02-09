import { FC } from 'react';
import face from './face.png'
import Tilt from 'react-parallax-tilt';

interface ILogoProps{

}

const Logo: FC<ILogoProps> = (props) => {
    return (
        <Tilt style={{
            width: '150px',
            height: '150px',
            border: '1px solid darkblue',
            boxShadow: '2px 2px 1px #FF00FF',
            position: 'static',
            background: 'linear-gradient(to right, rgb(212, 0, 255), rgb(0, 217, 255))',
            marginLeft: '12px'
            }}
            tiltMaxAngleX={45}
            tiltMaxAngleY={45}
            tiltReverse={true}>
            <div className='Tilt-inner'>
                <img alt='logo' style={{paddingTop: '28px', padding: '26px'}} src={face}/>
            </div>
        </Tilt>
    );
}

export default Logo
