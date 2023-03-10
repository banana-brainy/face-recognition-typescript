import { MouseEventHandler, Component, ChangeEvent } from 'react';

interface IRegisterProps {
    onRouteChange: (route: MouseEventHandler<HTMLInputElement> | undefined | string) => void;
    loadUser: Function
}

interface IRegisterState {
    email: string,
    password: string,
    name: string
}

interface IRegisterResponse {
    id: string,
    name: string,
    email: string,
    entries: number,
    joined: Date
}

class Register extends Component <IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
      }

    onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.target.value})
    }
        
    onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://face-detection-api-ejmw.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then((user: IRegisterResponse) => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }
    
    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                id="name"
                                onChange={this.onNameChange}
                            />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Proceed"
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
};

export default Register
