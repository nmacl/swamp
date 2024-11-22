import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth'; // updated imports
import { auth } from '../firebase'; // Your firebase export should give access to auth

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
    const [email, setEmail] = useState(auth.currentUser?.email || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleBackToDashboard = () => {
        navigate('/');
    };

    const handleUpdateProfile = async () => {
        setError('');
        setSuccess('');
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName });
                setSuccess('Profile updated successfully!');
            }
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        }
    };

    const handleUpdateEmail = async () => {
        setError('');
        setSuccess('');
        try {
            if (auth.currentUser) {
                await updateEmail(auth.currentUser, email);
                setSuccess('Email updated successfully!');
            }
        } catch (err) {
            setError('Failed to update email. Please try again.');
        }
    };

    const handleChangePassword = async () => {
        setError('');
        setSuccess('');
        try {
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long.');
            }
            if (auth.currentUser) {
                await updatePassword(auth.currentUser, password);
                setSuccess('Password updated successfully!');
            }
        } catch (err) {
            setError((err as Error).message || 'Failed to update password.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Settings</h1>

            <div style={styles.formContainer}>
                <h2 style={styles.sectionTitle}>Update Profile</h2>
                <input
                    type="text"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    style={styles.input}
                />
                <button style={styles.button} onClick={handleUpdateProfile}>
                    Update Profile
                </button>

                <h2 style={styles.sectionTitle}>Update Email</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <button style={styles.button} onClick={handleUpdateEmail}>
                    Update Email
                </button>

                <h2 style={styles.sectionTitle}>Change Password</h2>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button style={styles.button} onClick={handleChangePassword}>
                    Change Password
                </button>

                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                <button style={styles.backButton} onClick={handleBackToDashboard}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: 'black',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        borderBottom: '1px solid #ccc',
        paddingBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#6200ea',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    backButton: {
        marginTop: '20px',
        width: '100%',
        padding: '10px',
        backgroundColor: '#ccc',
        color: '#333',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
};

export default SettingsPage;
