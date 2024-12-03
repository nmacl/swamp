import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db } from './firebaseConfig'; // Adjust path to your Firebase config

const DiscussionMessages: React.FC<{ discussionId: string }> = ({ discussionId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!discussionId) return;

    // Reset messages and fetch messages for the new discussion
    const messagesRef = ref(db, `discussions/${discussionId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      const messagesArray = messagesData ? Object.entries(messagesData).map(([key, value]) => ({ id: key, ...value })) : [];
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, [discussionId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messagesRef = ref(db, `discussions/${discussionId}/messages`);
    const newMessageRef = push(messagesRef);

    await set(newMessageRef, {
      content: newMessage,
      timestamp: Date.now(),
      authorId: 'userId', // Replace with actual user ID
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="p-2 border-b border-gray-300">
            <p>{message.content}</p>
            <small className="text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-grow border rounded p-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded px-4 py-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DiscussionMessages;
