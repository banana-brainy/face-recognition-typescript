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

  /*
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  */

  /*
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  */

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    // The response is from the Clarifai.
    // The commented out code is basically the same as my working code below,
    // except two functions.
    /*
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log('hi', response)
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
    */
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
    .catch(console.log)
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
