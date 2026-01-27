import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import {
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
  ToggleLeft,
  ToggleRight,
  Clock,
  Calendar
} from 'lucide-react'

const notificationTypes = [
  { value: 'alert', label: 'Alert', icon: AlertCircle, color: 'bg-red-100 text-red-700' },
  { value: 'info', label: 'Info', icon: Info, color: 'bg-blue-100 text-blue-700' },
  { value: 'warning', label: 'Warning', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-700' },
  { value: 'success', label: 'Success', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
]

function NotificationsPanel() {
  const notifications = useQuery(api.notifications.list) ?? []
  const createNotification = useMutation(api.notifications.create)
  const updateNotification = useMutation(api.notifications.update)
  const removeNotification = useMutation(api.notifications.remove)
  const toggleLive = useMutation(api.notifications.toggleLive)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNotification, setEditingNotification] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info',
    isLive: true,
    scheduledFor: '',
    expiresAt: '',
  })

  const openCreateModal = () => {
    setEditingNotification(null)
    setFormData({
      title: '',
      content: '',
      type: 'info',
      isLive: true,
      scheduledFor: '',
      expiresAt: '',
    })
    setIsModalOpen(true)
  }

  const openEditModal = (notification) => {
    setEditingNotification(notification)
    setFormData({
      title: notification.title,
      content: notification.content || '',
      type: notification.type,
      isLive: notification.isLive,
      scheduledFor: notification.scheduledFor
        ? new Date(notification.scheduledFor).toISOString().slice(0, 16)
        : '',
      expiresAt: notification.expiresAt
        ? new Date(notification.expiresAt).toISOString().slice(0, 16)
        : '',
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingNotification(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      title: formData.title,
      content: formData.content || undefined,
      type: formData.type,
      isLive: formData.isLive,
      scheduledFor: formData.scheduledFor
        ? new Date(formData.scheduledFor).getTime()
        : undefined,
      expiresAt: formData.expiresAt
        ? new Date(formData.expiresAt).getTime()
        : undefined,
    }

    if (editingNotification) {
      await updateNotification({ id: editingNotification._id, ...data })
    } else {
      await createNotification(data)
    }

    closeModal()
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      await removeNotification({ id })
    }
  }

  const handleToggleLive = async (id) => {
    await toggleLive({ id })
  }

  const getTypeConfig = (type) => {
    return notificationTypes.find(t => t.value === type) || notificationTypes[1]
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not set'
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-slate-600">Manage alert banners shown to parents</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Notification
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No notifications yet</p>
            <button
              onClick={openCreateModal}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first notification
            </button>
          </div>
        ) : (
          notifications.map((notification) => {
            const typeConfig = getTypeConfig(notification.type)
            const TypeIcon = typeConfig.icon

            return (
              <div
                key={notification._id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Type badge */}
                  <div className={`p-2.5 rounded-xl ${typeConfig.color}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-slate-800 truncate">
                        {notification.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          notification.isLive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {notification.isLive ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    {notification.content && (
                      <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                        {notification.content}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      {notification.scheduledFor && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Scheduled: {formatDate(notification.scheduledFor)}
                        </span>
                      )}
                      {notification.expiresAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Expires: {formatDate(notification.expiresAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleLive(notification._id)}
                      className={`p-2 rounded-lg transition-colors ${
                        notification.isLive
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-slate-400 hover:bg-slate-100'
                      }`}
                      title={notification.isLive ? 'Set to draft' : 'Set to live'}
                    >
                      {notification.isLive ? (
                        <ToggleRight className="w-6 h-6" />
                      ) : (
                        <ToggleLeft className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(notification)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(notification._id)}
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
                {editingNotification ? 'Edit Notification' : 'New Notification'}
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
                  placeholder="Enter notification title"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Content (optional)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Enter additional details"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {notificationTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, type: type.value }))
                        }
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-colors ${
                          formData.type === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${type.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-slate-700">
                          {type.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Live toggle */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="font-medium text-slate-700">Live</span>
                  <p className="text-sm text-slate-500">
                    Show notification to parents immediately
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isLive: !prev.isLive }))
                  }
                  className={`p-1 rounded-full transition-colors ${
                    formData.isLive ? 'bg-green-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      formData.isLive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Schedule for (optional)
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledFor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      scheduledFor: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>

              {/* Expires */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Expires at (optional)
                </label>
                <input
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      expiresAt: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
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
                  {editingNotification ? 'Save Changes' : 'Create Notification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationsPanel
