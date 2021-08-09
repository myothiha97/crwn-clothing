import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { auth, singInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends Component {
  state = { email: "", password: "" };

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (ex) {
      console.log(ex.message);
    }

    this.setState({ email: "", password: "" });
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormInput
            name="email"
            type="email"
            value={email}
            label="email"
            handleChange={this.handleChange.bind(this)}
          />

          <FormInput
            name="password"
            type="password"
            value={password}
            label="password"
            handleChange={this.handleChange.bind(this)}
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton
              type="button"
              onClick={() => singInWithGoogle()}
              isGoogleSignIn={true}
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
