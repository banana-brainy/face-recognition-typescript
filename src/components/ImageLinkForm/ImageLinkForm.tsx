import { FC, ChangeEvent, MouseEventHandler } from 'react';
import './ImageLinkForm.css';

interface IImageLinkFormProps{
  title: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPictureSubmit: MouseEventHandler<HTMLButtonElement>;
}

const ImageLinkForm: FC<IImageLinkFormProps> = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className='f3 pa3 white'>
        {'This App will detect faces in your pictures. Try it out!'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onPictureSubmit}
            >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm
