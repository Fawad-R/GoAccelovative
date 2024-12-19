"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      // Replace with your API endpoint or backend route
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        // Redirect or display success message
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/' });
      if (result.ok) {
        console.log('Google Sign-In successful:', result);
      } else {
        console.error('Google Sign-In failed:', result.error);
      }
    } catch (error) {
      console.error('Error with Google Sign-In:', error);
    }
  };

  return (
    <section id="content" className="m-t-lg wrapper-md animated fadeInDown">
      <a className="nav-brand" href="/">todo</a>
      <div className="row m-n">
        <div className="col-md-4 col-md-offset-4 m-t-lg">
          <section className="panel">
            <header className="panel-heading bg bg-primary text-center">Sign up</header>
            <form onSubmit={handleSubmit} className="panel-body">
              <div className="form-group">
                <label className="control-label">Your email address</label>
                <input
                  type="email"
                  placeholder="test@example.com"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Type a password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> Agree to the <a href="#">terms and policy</a>
                </label>
              </div>
              <button type="submit" className="btn btn-info">Sign up</button>
              <div className="line line-dashed"></div>
              <p className="text-muted text-center">
                <small>Already have an account?</small>
              </p>
              <a href="/login" className="btn btn-white btn-block">Sign in</a>

              <div className="text-center mt-4">
                <button type="button" onClick={handleGoogleSignIn} className="btn btn-danger">
                  Sign in with Google
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
}
