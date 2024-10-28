import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Discussion from './components/Discussion';
import AuthForm from './components/AuthForm';
import banner from './banner.webp';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

function App() {
    const [showAuthForm, setShowAuthForm] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const handleAuthFormToggle = () => {
        setShowAuthForm(prevState => !prevState);
    };

    const handleAuthSuccess = () => {
        setShowAuthForm(false); // Close the form on successful login/signup
    };

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <div className="flex justify-center">
                <h1>
                    <img src={banner} alt="Swamp Banner" className="max-w-md mb-4 shadow-2xl rounded-xl" />
                </h1>
                
            </div>

            {showAuthForm && (
                <div className="bg-white shadow-lg rounded-lg p-8 m-4 relative">
                    <button
                        className="absolute top-2 left-2 flexbutton text-white p-2 bg-indigo-500 rounded"
                        onClick={handleAuthFormToggle}
                    >
                        Close
                    </button>
                    <AuthForm onSuccess={handleAuthSuccess} />
                </div>
            )}

            <Navbar onSignUp={handleAuthFormToggle} user={user} />
            <Discussion />
        </>
    );
}

export default App;
