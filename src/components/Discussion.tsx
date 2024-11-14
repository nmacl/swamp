import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';

// Define the shape of the discussion object
interface Discussion {
  id?: string;
  title: string;
  lastMessages: string[];
  iconUrl: string;
}

// Sub-component: DiscussionCard
interface DiscussionCardProps {
  discussion: Discussion;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md transition-transform hover:scale-105 relative">
      <img
        src={discussion.iconUrl}
        alt={discussion.title}
        className="w-12 h-12 rounded mr-4"
      />
      <div className="flex-grow">
        <span className="font-bold text-gunmetal">{discussion.title}</span>
        {/* Container for last messages */}
        <div className="absolute top-full left-0 mt-2 w-full bg-white p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          {discussion.lastMessages.map((msg, index) => (
            <p key={index} className="text-silver text-sm">
              {msg}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

// Form component to add new discussions
const DiscussionForm: React.FC<{ onAddDiscussion: (discussion: Discussion) => void }> = ({ onAddDiscussion }) => {
  const [title, setTitle] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscussion: Discussion = {
      title,
      lastMessages: ['Welcome to the discussion!'],
      iconUrl: iconUrl || 'https://via.placeholder.com/150',
    };
    onAddDiscussion(newDiscussion);
    setTitle('');
    setIconUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Discussion Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-black w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Icon URL"
        value={iconUrl}
        onChange={(e) => setIconUrl(e.target.value)}
        className="text-black w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="w-full p-2 text-white bg-indigo-500 rounded">
        Add Discussion
      </button>
    </form>
  );
};

// Main Component: DiscussionList
const DiscussionList: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  // Function to add a new discussion to the database
  const addDiscussion = (discussion: Discussion) => {
    const discussionsRef = ref(db, 'discussions');
    push(discussionsRef, discussion);
  };

  // Fetch discussions from the database on component load
  useEffect(() => {
    const discussionsRef = ref(db, 'discussions');
    onValue(discussionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedDiscussions = Object.entries(data).map(([id, discussion]) => ({
          id,
          ...discussion as Discussion,
        }));
        setDiscussions(loadedDiscussions);
      }
    });
  }, []);

  return (
    <div className="p-4 space-y-4">
      <DiscussionForm onAddDiscussion={addDiscussion} />
      {discussions.map((discussion) => (
        <DiscussionCard key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
};

const Discussion: React.FC = () => {
  return (
    <div className="min-h-screen bg-gunmetal text-white">
      <DiscussionList />
    </div>
  );
};

export default Discussion;
