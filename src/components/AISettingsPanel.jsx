import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Settings, Plus, Edit3, Trash2, Save, BookOpen } from 'lucide-react';

// Auto-detect API URL based on environment
const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';

/**
 * AISettingsPanel Component
 * Admin panel for testing and configuring the chat assistant
 */
const AISettingsPanel = ({ data, setData }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m the Artios assistant. You can:\n\n• Ask me questions like a parent would (to test responses)\n• Tell me to remember new information\n• Ask me to update how I respond to certain topics\n\nWhat would you like to do?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [editingKnowledge, setEditingKnowledge] = useState(null);
  const [newKnowledge, setNewKnowledge] = useState({ topic: '', info: '' });
  const messagesEndRef = useRef(null);

  // Knowledge base management
  const knowledgeBase = data.aiKnowledge || [];

  const addKnowledge = () => {
    if (!newKnowledge.topic.trim() || !newKnowledge.info.trim()) {
      alert('Please enter both a topic and information.');
      return;
    }
    const newItem = {
      id: Date.now(),
      topic: newKnowledge.topic.trim(),
      info: newKnowledge.info.trim(),
      createdAt: new Date().toISOString()
    };
    setData(prev => ({
      ...prev,
      aiKnowledge: [...(prev.aiKnowledge || []), newItem]
    }));
    setNewKnowledge({ topic: '', info: '' });
  };

  const updateKnowledge = (id, updates) => {
    setData(prev => ({
      ...prev,
      aiKnowledge: (prev.aiKnowledge || []).map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const deleteKnowledge = (id) => {
    if (confirm('Delete this knowledge entry?')) {
      setData(prev => ({
        ...prev,
        aiKnowledge: (prev.aiKnowledge || []).filter(item => item.id !== id)
      }));
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId: 'admin-' + Date.now(),
          customPrompt: data.aiSettings?.systemPrompt
        })
      });
      const result = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: result.message || 'No response' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Make sure the server is running (npm run server).' }]);
    }
    setLoading(false);
  };

  const updateAISettings = (field, value) => {
    setData(prev => ({
      ...prev,
      aiSettings: { ...prev.aiSettings, [field]: value }
    }));
  };

  return (
    <div className="ai-admin-panel">
      <div className="ai-admin-chat">
        <div className="ai-admin-chat-header">
          <Bot size={20} />
          <span>Chat with Artios Assistant</span>
          <button onClick={() => setMessages([messages[0]])} className="btn-clear-sm">Clear</button>
        </div>
        <div className="ai-admin-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`ai-admin-message ${msg.role}`}>
              {msg.content.split('\n').map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </div>
          ))}
          {loading && <div className="ai-admin-message assistant"><p>Thinking...</p></div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="ai-admin-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a question or give instructions..."
          />
          <button onClick={sendMessage} disabled={loading}><Send size={18} /></button>
        </div>
      </div>

      {/* Knowledge Base Section */}
      <div className="ai-knowledge-section">
        <button onClick={() => setShowKnowledgeBase(!showKnowledgeBase)} className="btn-knowledge-toggle">
          <BookOpen size={16} />
          {showKnowledgeBase ? 'Hide Knowledge Base' : 'Manage Knowledge Base'} ({knowledgeBase.length} items)
        </button>
        {showKnowledgeBase && (
          <div className="ai-knowledge-content">
            <p className="ai-knowledge-note">
              Add facts and information here. The assistant will use these when answering questions.
            </p>

            {/* Add New Knowledge */}
            <div className="ai-knowledge-add">
              <input
                type="text"
                value={newKnowledge.topic}
                onChange={(e) => setNewKnowledge(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="Topic (e.g., 'Spring Break 2026')"
                className="ai-knowledge-input"
              />
              <textarea
                value={newKnowledge.info}
                onChange={(e) => setNewKnowledge(prev => ({ ...prev, info: e.target.value }))}
                placeholder="Information (e.g., 'Spring Break is March 23-27, 2026. No classes during this week.')"
                className="ai-knowledge-textarea"
                rows={2}
              />
              <button onClick={addKnowledge} className="btn-add-knowledge">
                <Plus size={16} /> Add to Knowledge Base
              </button>
            </div>

            {/* Knowledge List */}
            <div className="ai-knowledge-list">
              {knowledgeBase.length === 0 ? (
                <p className="ai-knowledge-empty">No custom knowledge added yet. Add information above.</p>
              ) : (
                knowledgeBase.map(item => (
                  <div key={item.id} className="ai-knowledge-item">
                    {editingKnowledge === item.id ? (
                      <div className="ai-knowledge-edit">
                        <input
                          type="text"
                          value={item.topic}
                          onChange={(e) => updateKnowledge(item.id, { topic: e.target.value })}
                          className="ai-knowledge-input"
                        />
                        <textarea
                          value={item.info}
                          onChange={(e) => updateKnowledge(item.id, { info: e.target.value })}
                          className="ai-knowledge-textarea"
                          rows={2}
                        />
                        <button onClick={() => setEditingKnowledge(null)} className="btn-done-edit">
                          <Save size={14} /> Done
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="ai-knowledge-header">
                          <strong>{item.topic}</strong>
                          <span className="ai-knowledge-date">
                            {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="ai-knowledge-info">{item.info}</p>
                        <div className="ai-knowledge-actions">
                          <button onClick={() => setEditingKnowledge(item.id)} className="btn-edit-knowledge">
                            <Edit3 size={14} /> Edit
                          </button>
                          <button onClick={() => deleteKnowledge(item.id)} className="btn-delete-knowledge">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className="ai-admin-advanced">
        <button onClick={() => setShowAdvanced(!showAdvanced)} className="btn-advanced-toggle">
          <Settings size={16} />
          {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
        </button>
        {showAdvanced && (
          <div className="ai-advanced-content">
            <p className="ai-advanced-note">Edit the assistant's core knowledge directly. Changes take effect immediately.</p>
            <textarea
              value={data.aiSettings?.systemPrompt || ''}
              onChange={(e) => updateAISettings('systemPrompt', e.target.value)}
              className="ai-prompt-editor"
              rows={12}
              placeholder="System prompt..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AISettingsPanel;
