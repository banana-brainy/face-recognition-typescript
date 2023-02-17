import { Component, MouseEventHandler, ChangeEvent } from 'react';

// The onRouteChange method is given to the SignIn class as a prompt,
// coming from the main App.tsx component. Same as the loadUser method.
interface ISignInProps {
    onRouteChange: (route: MouseEventHandler<HTMLInputElement> | undefined | string) => void,
    loadUser: Function
}

interface IUserIDFromDatabase {
    id: string
}

interface ISignInState {
    signInEmail: string,
    signInPassword: string
}

class SignIn extends Component<ISignInProps, ISignInState> {
    constructor(props: ISignInProps) {
    super(props);
    this.state = {
        signInEmail: '',
        signInPassword: ''
    }}
    
    onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({signInPassword: event.target.value})
    }

    // This method gets the response from the Sign-In page.
    // The response is the user object.
    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then((user: IUserIDFromDatabase) => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        )
    }
};

export default SignIn
