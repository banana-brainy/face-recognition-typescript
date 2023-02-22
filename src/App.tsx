import './App.css';
import { Component, ChangeEvent, MouseEventHandler } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

interface IForLoadingUser {
  id?: string,
  name?: string,
  email?: string,
  entries: number,
  joined?: Date
}

interface IAppState {
  input: string,
  imageUrl: string,
  /* box: Object, */
  route: MouseEventHandler<HTMLInputElement> | undefined | string,
  isSignedIn: boolean,
  user: IForLoadingUser
}

const initialState = {
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
      joined: new Date()
  }
}

class App extends Component<{title: string}, IAppState> {
  constructor(props: {title: string}) {
    super(props);
    this.state = initialState
  }

  loadUser = (data: IForLoadingUser) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  /* calculateFaceLocation = (This parameter supposedly should be an Object from the Clarifai API) => {
    const image = document.getElementById('img')!;
  } */

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({input: event.target.value});
  }

  // This function shows me an image from the input.
  // Commented out lines are for getting a response
  // from the old version of the Clarifai API,
  // which I can't use, so I will update the code later.
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState((prevState: IAppState) => {
        const updatedUser = Object.assign({}, prevState.user, { entries: count })
        return { ...prevState, user: updatedUser }
      })
    })
    /* app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)      
      .then(response => {
        if (response) {
        The 'fetch' method with the '/image' route should be here.
        }
        this.calculateFaceLocation(response)
      .catch(err => console.log(err));
    ); */
  }

  onRouteChange = (route: MouseEventHandler<HTMLInputElement> | undefined | string) => {
    if (route === 'signout') {
      this.setState(initialState)
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
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm title='image link form'
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
              />
              <FaceRecognition imageUrl={imageUrl}/>
            </>
          : (
              route === 'signin'
              // Passing the loadUser method to SignIn.
              // Why?
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : route === 'signout'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
