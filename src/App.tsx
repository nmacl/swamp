import React, { useState } from 'react';
import './App.css';
import SignUp from './components/SignUp';

function App() {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
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
