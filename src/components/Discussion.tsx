import React from 'react';

// Define the shape of the discussion object
interface Discussion {
  id: number;
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

// Main Component: DiscussionList
const DiscussionList: React.FC = () => {
  // Sample Data
  const discussions: Discussion[] = [
    {
      id: 1,
      title: 'General Chat',
      lastMessages: ['Hello everyone!', 'What’s up?'],
      iconUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Project Ideas',
      lastMessages: ['Anyone got cool ideas?', 'Check this out...'],
      iconUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Tech Talk',
      lastMessages: ['Let’s discuss the latest in tech.', 'AI is fascinating!'],
      iconUrl: 'https://via.placeholder.com/150',
    },
    // Add more discussions as needed
  ];

  return (
    <div className="p-4 space-y-4">
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
