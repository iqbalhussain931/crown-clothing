
import React from 'react';

import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({email: '', password: ''});
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password.
                </span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        id="email" 
                        type="email" 
                        name="email" 
                        value={this.state.email} required 
                        label="email"
                        handleChange={this.handleChange}
                    />
                    <FormInput 
                        id="password" 
                        type="password" 
                        name="password" 
                        value={this.state.password} required 
                        label="password"
                        handleChange={this.handleChange}
                    />

                    <div className="buttons">
                        <CustomButton type="sibmit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;