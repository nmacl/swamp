import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    onSignUp: () => void;
    user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ onSignUp, user }) => {
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate(`/SettingsPage`);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <nav className="bg-gunmetal p-4 relative">
            <div className="flex justify-between max-w-screen-lg mx-auto px-4">
                {/* Left-aligned buttons */}
                <div className="flex items-center space-x-4">
                    {/* New Discussion Button */}
                    <button className="text-white hover:text-gray-300" aria-label="New Discussion">
                        <FontAwesomeIcon icon={faPlus} size="lg" />
                    </button>

                    {/* Manage/Admin Button */}
                    <button
                        className="text-white hover:text-gray-300"
                        aria-label="Admin Dashboard"
                        onClick={handleSettingsClick} // ✅ Pass the function correctly
                    >
                        <FontAwesomeIcon icon={faCogs} size="lg" />
                    </button>
                </div>

                {/* Right-aligned Profile, Greeting, and Logout */}
                <div className="flex items-center space-x-2 absolute top-0 right-0 mt-4 mr-4">
                    {user && (
                        <>
                            <span className="text-white font-semibold">
                                Hi, {user.displayName || user.email}
                            </span>
                            <button
                                className="text-white hover:text-gray-300"
                                aria-label="Logout"
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                            </button>
                        </>
                    )}
                    {!user && (
                        <button
                            className="text-white hover:text-gray-300"
                            aria-label="Profile"
                            onClick={onSignUp}
                        >
                            <FontAwesomeIcon icon={faUser} size="lg" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
