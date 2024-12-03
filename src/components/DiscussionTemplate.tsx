import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, push, onValue, set, remove } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from 'firebase/auth';
import { useLocation } from 'react-router-dom';

interface Message {
  text: string;
  user: string;
  timestamp: number;
}

function DiscussionTemplate() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const { id } = useParams();
  const { title } = location.state || {}; 

  
  useState(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate('/login'); // Redirect to login if not authenticated
      } else {
        setUser(currentUser);
      }
      return () => unsubscribe();
    });
    
    

    // Fetch messages from Firebase
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList: Message[] = data ? Object.values(data) : [];
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [navigate]);

  useState(() => {
    // Clear messages when a new discussion is selected
    setMessages([]);
        // Fetch messages for the current discussion from Firebase
        const messagesRef = ref(db, `discussions/${id}/messages/`);
        const unsubscribe = onValue(messagesRef, (snapshot) => {
          const data = snapshot.val();
          const messagesList: Message[] = data ? Object.values(data) : [];
          setMessages(messagesList);
        });
        return () => unsubscribe()
      }, [id]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messagesRef = ref(db, `discussions/${id}/messages`);
    push(messagesRef, {
      text: newMessage,
      user: user?.displayName || user?.email || 'Anonymous',
      timestamp: Date.now(),
    });

    setNewMessage(''); // Clear input
  };
  /*const handleDeleteMessages = async () => {
    const messagesRef = ref(db, `discussions/${id}/messages`);
    try {
      // Remove all messages for the current discussion
      await remove(messagesRef);
      setMessages([]);
      // Optionally, clear the local state as well
      setMessages([]);
      console.log('Messages deleted successfully');
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  }; */


  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1> {title || 'Discussion Room'}</h1>
      </div>
      <div style={styles.chatContainer}>
        <div style={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} style={styles.message}>
              <strong style={styles.username}>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button style={styles.button} onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  header: {
    backgroundColor: '#6200ea',
    color: 'white',
    padding: '20px',
    width: '200%',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '200%',
    maxWidth: '600px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '20px',
    overflow: 'hidden',
  },
  messages: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: 'white',
    textAlign: 'left',
    color: 'black',
  },
  message: {
    marginBottom: '10px',
    padding: '5px',
    borderBottom: '1px solid #eee',
  },
  username: {
    color: '#6200ea',
    marginRight: '5px',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#6200ea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DiscussionTemplate;
