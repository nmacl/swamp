import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Discussion from './components/Discussion';
import AuthForm from './components/AuthForm';
import banner from './banner.webp';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, get, set, DatabaseReference } from 'firebase/database';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiscussionTemplate from './components/DiscussionTemplate';
import SettingsPage from './components/SettingsPage'; 


function App() {
    const [showAuthForm, setShowAuthForm] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const handleAuthFormToggle = () => {
        setShowAuthForm(prevState => !prevState);
    };

    const handleAuthSuccess = () => {
        setShowAuthForm(false); // Close the form on successful login/signup
    };

    // Function to push the current user's email to the discussions node
    const push = (): void => {
        if (user) {
            const discussionsRef: DatabaseReference = ref(db, `discussions/${user.uid}`);
            set(discussionsRef, { email: user.email })
                .then(() => {
                    console.log('User email pushed to discussions:', user.email);
                })
                .catch((error) => {
                    console.error('Error pushing data:', error);
                });
        } else {
            console.log('No user is signed in.');
        }
    };

    // Function to pull all emails from the discussions node
    const pull = (): void => {
        const discussionsRef: DatabaseReference = ref(db, 'discussions');
        get(discussionsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log('Discussions data:', snapshot.val());
                } else {
                    console.log('No discussions data found.');
                }
            })
            .catch((error) => {
                console.error('Error pulling data:', error);
            });
    };

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
            <Routes>
                <Route path="/" element={
                    <div>
                    <button className="text-3xl" onClick={push}>Push</button>
                    <button className="text-3xl" onClick={pull}>Pull</button>
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
                    </div>
                }/>
                
                <Route path="/" element={
                <div>
                    <Discussion />
                </div>
                } />
                <Route path="/discussion/:id" element={<DiscussionTemplate />} />
                <Route path="/SettingsPage" element={
                    <SettingsPage/>}
                />
            </Routes>
    );
}

export default App;
