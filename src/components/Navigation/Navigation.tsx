import { FC, MouseEventHandler } from 'react';

interface INavigationProps {
    onRouteChange: (route: MouseEventHandler<HTMLInputElement> | undefined) => void;
}

const Navigation: FC<INavigationProps> = ({ onRouteChange }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p onClick={() => onRouteChange /* I have to add here a () */} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
    );
}

export default Navigation
