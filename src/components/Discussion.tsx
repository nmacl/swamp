import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, push, onValue, set } from 'firebase/database';
import { User } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: number;
  likes: number;
  replies?: Comment[];
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: number;
  lastUpdated: number;
  iconUrl: string;
  tags: string[];
  comments: Comment[];
  likes: number;
  views: number;
}

interface DiscussionCardProps {
  discussion: Discussion;
  onDiscussionClick: (discussionId: string) => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, onDiscussionClick }) => {
  const {
    id,
    title,
    content,
    authorName,
    timestamp,
    iconUrl,
    tags = [],
    comments = [],
    likes = 0,
    views = 0,
  } = discussion;
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/discussion/${id}`)
  }

  return (
    <div
      className="flex flex-col p-4 bg-white rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
      onClick={handleClick} // Attach click handler to the card container
    >
      <div className="flex items-center mb-3">
        <img
          src={iconUrl || 'https://via.placeholder.com/150'}
          alt={title}
          className="w-12 h-12 rounded mr-4"
        />
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gunmetal">{title}</h3>
          <p className="text-sm text-gray-600">
            by {authorName || 'Anonymous'} • {new Date(timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="text-gray-700 mb-3 line-clamp-2">{content}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex space-x-4">
          <span>{comments.length} comments</span>
          <span>{likes} likes</span>
          <span>{views} views</span>
        </div>
        <div className="flex space-x-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


const DiscussionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    
    if (!user) {
      alert('You must be logged in to create a discussion');
      return;
    }

    const newDiscussion: Omit<Discussion, 'id'> = {
      title,
      content,
      authorId: user.uid,
      authorName: user.displayName || user.email || 'Anonymous',
      timestamp: Date.now(),
      lastUpdated: Date.now(),
      iconUrl: iconUrl || 'https://via.placeholder.com/150',
      tags: tags,
      comments: [], // Initialize with empty array
      likes: 0,
      views: 0
    };

    try {
      const discussionsRef = ref(db, 'discussions');
      const newRef = push(discussionsRef);
      await set(newRef, newDiscussion);

      // Reset form
      setTitle('');
      setContent('');
      setIconUrl('');
      setTags([]);
      setTagInput('');
    } catch (error) {
      console.error('Error creating discussion:', error);
      alert('Failed to create discussion. Please try again.');
    }
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
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
      <textarea
        placeholder="Discussion Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-black w-full p-2 mb-2 border rounded h-32"
        required
      />
      <input
        type="text"
        placeholder="Icon URL (optional)"
        value={iconUrl}
        onChange={(e) => setIconUrl(e.target.value)}
        className="text-black w-full p-2 mb-2 border rounded"
      />
      <div className="flex mb-2">
        <input
          type="text"
          placeholder="Add tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="text-black flex-grow p-2 border rounded-l"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 bg-gray-200 text-gray-700 rounded-r"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 px-2 py-1 rounded-full flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((_, i) => i !== index))}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <button type="submit" className="w-full p-2 text-white bg-indigo-500 rounded hover:bg-indigo-600">
        Create Discussion
      </button>
    </form>
  );
};

const DiscussionList: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    const discussionsRef = ref(db, 'discussions');
    onValue(discussionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedDiscussions = Object.entries(data).map(([id, discussion]) => ({
          id,
          ...(discussion as Omit<Discussion, 'id'>),
          comments: (discussion as any).comments || [], // Ensure comments is always an array
          tags: (discussion as any).tags || [], // Ensure tags is always an array
        }));
        setDiscussions(loadedDiscussions);
      } else {
        setDiscussions([]); // Set empty array if no discussions exist
      }
    });
  }, []);

  const handleDiscussionClick = (discussionId: string) => {
    console.log(`Navigate to discussion ${discussionId}`);
  };

  return (
    <div className="p-4 space-y-4">
      <DiscussionForm />
      {discussions.map((discussion) => (
        <DiscussionCard 
          key={discussion.id} 
          discussion={discussion}
          onDiscussionClick={handleDiscussionClick}
        />
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