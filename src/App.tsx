import './App.css';
import { Component, ChangeEvent, MouseEventHandler } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import { Register, IRegisterResponse } from './components/Register/Register';

interface IAppState {
  input: string,
  imageUrl: string,
  /* box: Object, */
  route: MouseEventHandler<HTMLInputElement> | undefined | string,
  isSignedIn: boolean,
  user: Object
}

class App extends Component<{title: string}, IAppState> {
  constructor(props: {title: string}) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      /* box: {}, */
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: Date
      }
    }
  }

  loadUser = (data: IRegisterResponse) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  /* calculateFaceLocation = (this parameter supposedly should be an Object from the Clarifai API ) => {
    const image = document.getElementById("img")!;
  } */

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}) /* This shows me an image from the input */

    /* The following lines of code are for getting a response from this old API which I can't use, so I will update it later
    
      app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)      
      .then(response => this.calculateFaceLocation(response)
      .catch(err => console.log(err));
    ); */
  }

  onRouteChange = (route: MouseEventHandler<HTMLInputElement> | undefined | string) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    return this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <>
              <Logo />
              <Rank />
              <ImageLinkForm title='image link form'
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageUrl={imageUrl}/>
            </>
          : (
              route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange}/>
              : route === 'signout'
              ? <SignIn onRouteChange={this.onRouteChange}/> 
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
