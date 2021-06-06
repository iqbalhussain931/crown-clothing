import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.style.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            alert("password don't match");
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword( email, password);
            
            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

        } catch (error) {
            console.log(error);
        }
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name] : value});
    }

    render() {

        const { displayName, email, password, confirmPassword } = this.state;

        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account.</h2>
                <span>Sign up with your email and password.</span>

                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        id="signup-displayName"
                        type="text"
                        name="displayName"
                        value={displayName}
                        label="Display Name"
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        id="signup-email"
                        type="email"
                        name="email"
                        value={email}
                        label="Email"
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        id="signup-password"
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        id="signup-confirmPassword"
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        required
                    />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;