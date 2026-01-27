import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import {
  Plus,
  Edit2,
  Trash2,
  Megaphone,
  X,
  Calendar,
  ExternalLink,
  Star,
  FileText
} from 'lucide-react'

const priorityLevels = [
  { value: 'low', label: 'Low', color: 'bg-slate-100 text-slate-700' },
  { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-700' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700' },
]

const announcementTypes = [
  { value: 'general', label: 'General' },
  { value: 'event', label: 'Event' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'update', label: 'Update' },
]

function AnnouncementsPanel() {
  const announcements = useQuery(api.announcements.list) ?? []
  const createAnnouncement = useMutation(api.announcements.create)
  const updateAnnouncement = useMutation(api.announcements.update)
  const removeAnnouncement = useMutation(api.announcements.remove)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    priority: 'normal',
    type: 'general',
    url: '',
  })

  const openCreateModal = () => {
    setEditingAnnouncement(null)
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      priority: 'normal',
      type: 'general',
      url: '',
    })
    setIsModalOpen(true)
  }

  const openEditModal = (announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      content: announcement.content,
      date: announcement.date,
      priority: announcement.priority,
      type: announcement.type || 'general',
      url: announcement.url || '',
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingAnnouncement(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      title: formData.title,
      content: formData.content,
      date: formData.date,
      priority: formData.priority,
      type: formData.type || undefined,
      url: formData.url || undefined,
    }

    if (editingAnnouncement) {
      await updateAnnouncement({ id: editingAnnouncement._id, ...data })
    } else {
      await createAnnouncement(data)
    }

    closeModal()
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      await removeAnnouncement({ id })
    }
  }

  const getPriorityConfig = (priority) => {
    return priorityLevels.find(p => p.value === priority) || priorityLevels[1]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Announcements</h1>
          <p className="text-slate-600">Post news and updates for parents</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No announcements yet</p>
            <button
              onClick={openCreateModal}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first announcement
            </button>
          </div>
        ) : (
          announcements.map((announcement) => {
            const priorityConfig = getPriorityConfig(announcement.priority)

            return (
              <div
                key={announcement._id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <Megaphone className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-semibold text-slate-800">
                        {announcement.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityConfig.color}`}
                      >
                        {priorityConfig.label}
                      </span>
                      {announcement.type && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {announcement.type}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                      {announcement.content}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(announcement.date)}
                      </span>
                      {announcement.url && (
                        <a
                          href={announcement.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View link
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(announcement)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(announcement._id)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                {editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Enter announcement title"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  rows={4}
                  placeholder="Enter announcement content"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Priority
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {priorityLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, priority: level.value }))
                      }
                      className={`p-2.5 rounded-xl border-2 font-medium text-sm transition-colors ${
                        formData.priority === level.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {announcementTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, type: type.value }))
                      }
                      className={`p-2.5 rounded-xl border-2 font-medium text-sm transition-colors ${
                        formData.type === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Link URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="https://example.com"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                >
                  {editingAnnouncement ? 'Save Changes' : 'Create Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnnouncementsPanel
