import React, { useState } from 'react';
import { Bot, Plus, Trash2, Edit3, Save, LogOut, Bell, X, Megaphone, Send } from 'lucide-react';
import AISettingsPanel from './AISettingsPanel';

/**
 * AdminPanel Component
 * Admin dashboard for managing notifications and assistant settings
 */
const AdminPanel = ({ data, setData, onLogout, initialData }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [editingItem, setEditingItem] = useState(null);

  const addItem = (type) => {
    const newItem = type === 'announcements'
      ? { id: Date.now(), title: 'New Announcement', content: '', date: new Date().toISOString().split('T')[0], priority: 'normal' }
      : type === 'upcomingEvents'
      ? { id: Date.now(), title: 'New Event', date: new Date().toISOString().split('T')[0], time: '', location: '' }
      : type === 'quickLinks'
      ? { id: Date.now(), title: 'New Link', url: 'https://', icon: 'external' }
      : { id: Date.now(), title: 'New Document', url: '#', category: 'Resources' };

    setData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
    setEditingItem({ type, id: newItem.id });
  };

  const updateItem = (type, id, updates) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const deleteItem = (type, id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id) }));
    }
  };

  const renderEditor = (type, item) => {
    const isEditing = editingItem?.type === type && editingItem?.id === item.id;

    if (type === 'announcements') {
      return (
        <div className="admin-item">
          <div className="admin-item-header">
            {isEditing ? (
              <input value={item.title} onChange={(e) => updateItem(type, item.id, { title: e.target.value })} className="admin-input" />
            ) : (
              <span className="admin-item-title">{item.title}</span>
            )}
            <div className="admin-item-actions">
              {isEditing ? (
                <button onClick={() => setEditingItem(null)} className="btn-icon"><Save size={16} /></button>
              ) : (
                <button onClick={() => setEditingItem({ type, id: item.id })} className="btn-icon"><Edit3 size={16} /></button>
              )}
              <button onClick={() => deleteItem(type, item.id)} className="btn-icon delete"><Trash2 size={16} /></button>
            </div>
          </div>
          {isEditing && (
            <div className="admin-item-edit">
              <textarea
                value={item.content}
                onChange={(e) => updateItem(type, item.id, { content: e.target.value })}
                placeholder="Announcement content..."
                rows={3}
              />
              <div className="admin-row">
                <input type="date" value={item.date} onChange={(e) => updateItem(type, item.id, { date: e.target.value })} />
                <select value={item.priority} onChange={(e) => updateItem(type, item.id, { priority: e.target.value })}>
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (type === 'upcomingEvents') {
      return (
        <div className="admin-item">
          <div className="admin-item-header">
            {isEditing ? (
              <input value={item.title} onChange={(e) => updateItem(type, item.id, { title: e.target.value })} className="admin-input" />
            ) : (
              <span className="admin-item-title">{item.title}</span>
            )}
            <div className="admin-item-actions">
              {isEditing ? (
                <button onClick={() => setEditingItem(null)} className="btn-icon"><Save size={16} /></button>
              ) : (
                <button onClick={() => setEditingItem({ type, id: item.id })} className="btn-icon"><Edit3 size={16} /></button>
              )}
              <button onClick={() => deleteItem(type, item.id)} className="btn-icon delete"><Trash2 size={16} /></button>
            </div>
          </div>
          {isEditing && (
            <div className="admin-item-edit">
              <div className="admin-row">
                <input type="date" value={item.date} onChange={(e) => updateItem(type, item.id, { date: e.target.value })} />
                <input type="text" value={item.time} onChange={(e) => updateItem(type, item.id, { time: e.target.value })} placeholder="Time (e.g., 6:00 PM)" />
              </div>
              <input type="text" value={item.location} onChange={(e) => updateItem(type, item.id, { location: e.target.value })} placeholder="Location" />
            </div>
          )}
        </div>
      );
    }

    if (type === 'quickLinks') {
      return (
        <div className="admin-item">
          <div className="admin-item-header">
            {isEditing ? (
              <input value={item.title} onChange={(e) => updateItem(type, item.id, { title: e.target.value })} className="admin-input" />
            ) : (
              <span className="admin-item-title">{item.title}</span>
            )}
            <div className="admin-item-actions">
              {isEditing ? (
                <button onClick={() => setEditingItem(null)} className="btn-icon"><Save size={16} /></button>
              ) : (
                <button onClick={() => setEditingItem({ type, id: item.id })} className="btn-icon"><Edit3 size={16} /></button>
              )}
              <button onClick={() => deleteItem(type, item.id)} className="btn-icon delete"><Trash2 size={16} /></button>
            </div>
          </div>
          {isEditing && (
            <div className="admin-item-edit">
              <input type="url" value={item.url} onChange={(e) => updateItem(type, item.id, { url: e.target.value })} placeholder="URL (https://...)" />
              <select value={item.category || 'Essential'} onChange={(e) => updateItem(type, item.id, { category: e.target.value })}>
                <option value="Essential">Essential (FACTS, Lunch, etc.)</option>
                <option value="Newsletters">Newsletters</option>
                <option value="Events">Events</option>
                <option value="Documents">Documents/Forms</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Shopping">Shopping/Store</option>
              </select>
            </div>
          )}
        </div>
      );
    }

    if (type === 'documents') {
      return (
        <div className="admin-item">
          <div className="admin-item-header">
            {isEditing ? (
              <input value={item.title} onChange={(e) => updateItem(type, item.id, { title: e.target.value })} className="admin-input" />
            ) : (
              <span className="admin-item-title">{item.title}</span>
            )}
            <div className="admin-item-actions">
              {isEditing ? (
                <button onClick={() => setEditingItem(null)} className="btn-icon"><Save size={16} /></button>
              ) : (
                <button onClick={() => setEditingItem({ type, id: item.id })} className="btn-icon"><Edit3 size={16} /></button>
              )}
              <button onClick={() => deleteItem(type, item.id)} className="btn-icon delete"><Trash2 size={16} /></button>
            </div>
          </div>
          {isEditing && (
            <div className="admin-item-edit">
              <input type="url" value={item.url} onChange={(e) => updateItem(type, item.id, { url: e.target.value })} placeholder="Document URL" />
              <select value={item.category} onChange={(e) => updateItem(type, item.id, { category: e.target.value })}>
                <option value="Policies">Policies</option>
                <option value="Calendar">Calendar</option>
                <option value="Resources">Resources</option>
                <option value="Forms">Forms</option>
              </select>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const resetToDefaults = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      setData(initialData);
      localStorage.removeItem('artiosConnectData');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <button onClick={resetToDefaults} className="btn-reset">Reset to Defaults</button>
          <button onClick={onLogout} className="btn-logout"><LogOut size={18} /> Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
          <Megaphone size={16} /> Push Alerts
        </button>
        <button className={activeTab === 'aiSettings' ? 'active' : ''} onClick={() => setActiveTab('aiSettings')}>
          <Bot size={16} /> Assistant
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'aiSettings' ? (
          <AISettingsPanel data={data} setData={setData} />
        ) : activeTab === 'notifications' ? (
          <div className="notifications-admin">
            <div className="admin-section-header">
              <h2>Push Alerts to Parents</h2>
              <button onClick={() => {
                const newNotification = {
                  id: Date.now(),
                  title: '',
                  content: '',
                  type: 'info',
                  isLive: false,
                  postedAt: null
                };
                setData(prev => ({
                  ...prev,
                  notifications: [...(prev.notifications || []), newNotification]
                }));
                setEditingItem({ type: 'notifications', id: newNotification.id });
              }} className="btn-add"><Plus size={16} /> Create New Alert</button>
            </div>
            <p className="admin-helper-text">
              Create alerts that appear as a banner at the top of the site. Parents can dismiss them after viewing.
            </p>

            {/* Live Alerts */}
            {(data.notifications || []).filter(n => n.isLive).length > 0 && (
              <div className="notification-section">
                <h3 className="notification-section-title live"><Bell size={16} /> Currently Live</h3>
                <div className="admin-list">
                  {(data.notifications || []).filter(n => n.isLive).map(item => (
                    <div key={item.id} className={`admin-item notification-live ${item.type}`}>
                      <div className="admin-item-header">
                        <div className="notification-info">
                          <span className={`notification-badge ${item.type}`}>
                            {item.type === 'urgent' ? 'URGENT' :
                             item.type === 'weather' ? 'WEATHER' :
                             item.type === 'reminder' ? 'REMINDER' : 'INFO'}
                          </span>
                          <span className="admin-item-title">{item.title || 'Untitled Alert'}</span>
                        </div>
                        <div className="notification-meta">
                          <span className="posted-date">Posted {item.postedAt ? new Date(item.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Unknown'}</span>
                        </div>
                      </div>
                      {item.content && <p className="notification-preview">{item.content}</p>}
                      <div className="notification-actions">
                        <button onClick={() => {
                          if (confirm('Remove this alert? Parents will no longer see it.')) {
                            updateItem('notifications', item.id, { isLive: false, postedAt: null });
                          }
                        }} className="btn-cancel-alert">
                          <X size={14} /> Take Down
                        </button>
                        <button onClick={() => deleteItem('notifications', item.id)} className="btn-delete-alert">
                          <Trash2 size={14} /> Delete Permanently
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Draft Alerts */}
            <div className="notification-section">
              <h3 className="notification-section-title draft"><Edit3 size={16} /> Drafts</h3>
              <div className="admin-list">
                {(data.notifications || []).filter(n => !n.isLive).map(item => {
                  const isEditing = editingItem?.type === 'notifications' && editingItem?.id === item.id;
                  return (
                    <div key={item.id} className="admin-item notification-draft">
                      {isEditing ? (
                        <div className="notification-editor">
                          <input
                            value={item.title}
                            onChange={(e) => updateItem('notifications', item.id, { title: e.target.value })}
                            className="admin-input"
                            placeholder="Alert title (e.g., School Closed Tomorrow)"
                            autoFocus
                          />
                          <textarea
                            value={item.content}
                            onChange={(e) => updateItem('notifications', item.id, { content: e.target.value })}
                            placeholder="Optional details..."
                            rows={2}
                          />
                          <div className="notification-editor-row">
                            <select value={item.type} onChange={(e) => updateItem('notifications', item.id, { type: e.target.value })}>
                              <option value="info">General Info (Blue)</option>
                              <option value="reminder">Event Reminder (Purple)</option>
                              <option value="weather">Weather/Closure (Yellow)</option>
                              <option value="urgent">URGENT - Cannot Dismiss (Red)</option>
                            </select>
                            <div className="notification-editor-actions">
                              <button onClick={() => setEditingItem(null)} className="btn-done">Done Editing</button>
                              <button onClick={() => {
                                if (!item.title.trim()) {
                                  alert('Please enter a title for your alert.');
                                  return;
                                }
                                updateItem('notifications', item.id, { isLive: true, postedAt: new Date().toISOString() });
                                setEditingItem(null);
                              }} className="btn-send-alert">
                                <Send size={14} /> Send Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="admin-item-header">
                            <div className="notification-info">
                              <span className={`notification-badge draft`}>DRAFT</span>
                              <span className="admin-item-title">{item.title || 'Untitled (click to edit)'}</span>
                            </div>
                            <div className="admin-item-actions">
                              <button onClick={() => setEditingItem({ type: 'notifications', id: item.id })} className="btn-icon"><Edit3 size={16} /></button>
                              <button onClick={() => deleteItem('notifications', item.id)} className="btn-icon delete"><Trash2 size={16} /></button>
                            </div>
                          </div>
                          {item.content && <p className="notification-preview">{item.content}</p>}
                          <div className="notification-actions">
                            <button onClick={() => setEditingItem({ type: 'notifications', id: item.id })} className="btn-edit-draft">
                              <Edit3 size={14} /> Edit
                            </button>
                            <button onClick={() => {
                              if (!item.title.trim()) {
                                alert('Please enter a title for your alert.');
                                setEditingItem({ type: 'notifications', id: item.id });
                                return;
                              }
                              updateItem('notifications', item.id, { isLive: true, postedAt: new Date().toISOString() });
                            }} className="btn-send-alert">
                              <Send size={14} /> Send Now
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
                {(data.notifications || []).filter(n => !n.isLive).length === 0 && (
                  <p className="admin-empty-state">No draft alerts. Click "Create New Alert" to start one.</p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminPanel;
