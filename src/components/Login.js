import React, { Component } from 'react'
import firebase from 'firebase'
import base, { firebaseApp } from "../base";

export default class Login extends Component {
	state = {
    otp: false,
	}

  phoneRef = React.createRef();
  otpRef = React.createRef();

  otpInput = (<div className="group"><input className="input" type="number" placeholder="OTP" ref={this.otpRef}/></div>);
  
	auth = (event) => {
		event.preventDefault();
		firebase.auth().useDeviceLanguage();
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const appVerifier = window.recaptchaVerifier;

    
    this.otpRef.current.style.display = 'block';

		firebase.auth().signInWithPhoneNumber(this.phoneRef.current.value, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });
  }
  
  
	render() {

    return (
			<div className="container">
        <div className="container__child signup__thumbnail">
          <div className="thumbnail__content text-center">
            <h2 className="heading--secondary">Welcome.</h2>
            <p className="intropara">Content of this paragraph can be some introduction or instructions for the users.
            </p>
          </div>
          <div className="signup__overlay">
          </div>
        </div>
        <div className="container__child signup__form">
          <div className="login-wrap">
            <div className="login-html">
              <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
              <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
              <div className="login-form">
                <div className="sign-in-htm">
                  <div className="group">
                    <label htmlFor="user" className="label">Phone Number</label>
                    <input id="user" ref={this.phoneRef} type="number" placeholder="Phone Number" className="input" />
                  </div>
                  {/* <div className="group">
                    <input id="check" type="checkbox" className="check" defaultChecked />
                    <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
                  </div> */}
									<div id="recaptcha-container" className="group">

									</div>

                  <div className="group">
                    <input className="input" style={{display: 'none'}} type="number" placeholder="OTP" ref={this.otpRef}/>
                  </div>

                  <div className="group">
                    <input type="submit" onClick={this.auth} value="Sign In" className="button" />
                  </div>
                  <div className="hr" />
                  <div className="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                  </div>
                </div>
                <div className="sign-up-htm">
                  <div className="group">
                    <label htmlFor="user" className="label">Username</label>
                    <input id="user" type="text" className="input" />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    <input id="pass" type="password" className="input" data-type="password" />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">Repeat Password</label>
                    <input id="pass" type="password" className="input" data-type="password" />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">Email Address</label>
                    <input id="pass" type="text" className="input" />
                  </div>
                  <div className="group">
                    <input type="submit" className="button" defaultValue="Sign Up" />
                  </div>
                  <div className="hr" />
                  <div className="foot-lnk">
                    <label htmlFor="tab-1">Already Member?
                    </label></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
			
			//End
    )
  }
}
