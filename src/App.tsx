import './App.css';
import { Component, ChangeEvent, MouseEventHandler } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Entries/Entries';
import ParticlesBg from 'particles-bg'
import FaceDetection from './components/FaceDetection/FaceDetection';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

interface IBox {
  topRow: number,
  rightCol: number,
  bottomRow: number,
  leftCol: number
}

interface IClarifaiFace {
  left_col: number,
  top_row: number,
  right_col: number,
  bottom_row: number
}

interface IForLoadingUser {
  id?: string,
  name?: string,
  email?: string,
  entries: number,
  joined?: Date
}

interface IAppState {
  displayBox: boolean,
  input: string,
  imageUrl: string,
  box: IBox,
  route: MouseEventHandler<HTMLInputElement> | undefined | string,
  isSignedIn: boolean,
  user: IForLoadingUser
}

const initialState = {
  displayBox: false,
  input: '',
  imageUrl: '',
  box: { 
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
    leftCol: 0
  },
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

  calculateFaceLocation = (data: { outputs: { data: { regions: { region_info: { bounding_box: IClarifaiFace }; }[]; }; }[]; }) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage') as HTMLImageElement;
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
 
  displayFaceBox = (box: IBox) => {
    this.setState({
      box: box,
      displayBox: true
    });
  }

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/apicall', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/count', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then((count: number) => {
          this.setState((prevState: IAppState) => {
            const updatedUser = Object.assign({}, prevState.user, { entries: count })
            return { ...prevState, user: updatedUser }
          })
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => {
      this.setState({ displayBox: false })
      console.log(err)
    });
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
    const { isSignedIn, imageUrl, route, box, displayBox } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm title='image link form' onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
              <FaceDetection displayBox={displayBox} box={box} imageUrl={imageUrl}/>
            </>
          : (
              route === 'signin'
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
