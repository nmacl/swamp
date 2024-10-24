import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Discussion from './components/Discussion';
import SignUp from './components/SignUp';

function App() {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
            {/* Left Section: Swamp */}
            <div>
                <h1 className="text-white text-3xl font-bold m-4">Swamp</h1>
            </div>

            {showSignUp && (
                <div className="absolute top-16 right-64 bg-white shadow-lg rounded-lg">
                    <SignUp/>
                </div>
            )}
            <button
                className="signup-button px-8 py-3 m-8 bg-indigo-400 rounded-sm shadow-xl text-white"
                onClick={() => setShowSignUp(!showSignUp)}
            >
                Sign Up
            </button>

            <Navbar/>
            <Login/>
            <Discussion/>
        </>
    );
}

export default App;
