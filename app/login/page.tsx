"use client";

import { useState } from "react";
import Head from "next/head";
import "../styles/LoginPage.css"; // Import the CSS file

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="container">
      <Head>
        <title>{isSignUp ? "Sign Up" : "Sign In"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="form-box">
        <h1 id="title">{isSignUp ? "Sign Up" : "Sign In"}</h1>
        <form>
          <div className={`input-group ${isSignUp ? "sign-up" : "sign-in"}`}>
            {isSignUp && (
              <div className="input-field" id="nameField">
                <input type="text" placeholder="Name" />
              </div>
            )}
            <div className="input-field">
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <input type="password" placeholder="Password" />
            </div>
            <p>
              Forgot Password? <a href="#">Click Here</a>
            </p>
          </div>
          <div className="btn-field">
            <button
              type="button"
              onClick={toggleMode}
              className={isSignUp ? "" : "disable"}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={toggleMode}
              className={isSignUp ? "disable" : ""}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
