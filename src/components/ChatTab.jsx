import React from 'react';
import ChatWidget from './ChatWidget';

/**
 * ChatTab Component
 * Full-screen chat interface for the tabbed navigation redesign
 */
const ChatTab = ({ systemPrompt, initialQuestion, onQuestionSent }) => {
  return (
    <div className="tab-content chat-tab">
      <ChatWidget
        isEmbedded={true}
        customPrompt={systemPrompt}
        initialQuestion={initialQuestion}
        onQuestionSent={onQuestionSent}
      />
    </div>
  );
};

export default ChatTab;
