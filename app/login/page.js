"use client"; 
import React, { useState } from 'react';
// import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Only initialize the router on the client side
  // const router = typeof window !== 'undefined' ? useRouter() : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure router is available
    // if (!router) return;

    // Assuming an API endpoint for login exists at /api/auth/login
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('_id', JSON.stringify(data._id));
      localStorage.setItem('email', JSON.stringify(data.email));
      // Redirect to dashboard on success
      // router.push('/dashboard');
    } else {
      // Handle errors (e.g., invalid credentials)
      alert('Invalid email or password');
    }
  };

  return (
    <section id="content" className="m-t-lg wrapper-md animated fadeInUp">
      <a className="nav-brand" href="/">todo</a>
      <div className="row m-n">
        <div className="col-md-4 col-md-offset-4 m-t-lg">
          <section className="panel">
            <header className="panel-heading text-center">Sign in</header>
            <form onSubmit={handleSubmit} className="panel-body">
              <div className="form-group">
                <label className="control-label">Email</label>
                <input
                  type="email"
                  placeholder="test@example.com"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="checkbox">
                <label>
                  <input type="checkbox" /> Keep me logged in
                </label>
              </div> */}
              <a href="#" className="pull-right m-t-xs">
                <small>Forgot password?</small>
              </a>
              <button type="submit" className="btn btn-info">Sign in</button>
              <div className="line line-dashed"></div>
              <div className="line line-dashed"></div>
              <p className="text-muted text-center">
                <small>Do not have an account?</small>
              </p>
              <a href="/signup" className="btn btn-white btn-block">Create an account</a>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
}
