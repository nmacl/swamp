import React, { useState } from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Discussion from './components/Discussion';

function App() {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
            <Navbar/>
            <Login/>
            <Discussion/>
            <button
                className="signup-button"
                onClick={() => setShowSignUp(!showSignUp)}
            >
                Sign Up
            </button>

            {showSignUp && (
                <div className="container">
                    <SignUp />
                </div>
            )}
        </>
    );
}

export default App;
