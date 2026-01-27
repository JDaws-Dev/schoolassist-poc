import { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import {
  Bot,
  Thermometer,
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

function AISettingsPanel() {
  const aiSettings = useQuery(api.aiSettings.get)
  const updateSystemPrompt = useMutation(api.aiSettings.updateSystemPrompt)
  const updateTemperature = useMutation(api.aiSettings.updateTemperature)
  const addKnowledge = useMutation(api.aiSettings.addKnowledge)
  const updateKnowledge = useMutation(api.aiSettings.updateKnowledge)
  const removeKnowledge = useMutation(api.aiSettings.removeKnowledge)

  const [systemPrompt, setSystemPrompt] = useState('')
  const [temperature, setTemperature] = useState(0.2)
  const [promptSaveStatus, setPromptSaveStatus] = useState(null) // 'saving', 'saved', 'error'
  const [tempSaveStatus, setTempSaveStatus] = useState(null)

  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false)
  const [editingKnowledge, setEditingKnowledge] = useState(null)
  const [knowledgeFormData, setKnowledgeFormData] = useState({
    topic: '',
    info: '',
  })

  // Sync state with query data
  useEffect(() => {
    if (aiSettings) {
      setSystemPrompt(aiSettings.systemPrompt || getDefaultPrompt())
      setTemperature(aiSettings.temperature ?? 0.2)
    }
  }, [aiSettings])

  const getDefaultPrompt = () => {
    return `You are a helpful AI assistant for Artios Academies of Sugar Hill, a Christian homeschool hybrid (University-Model) school in Suwanee, Georgia.

Your role is to help parents find information about the school.

IMPORTANT RULES:
- ONLY provide information from your knowledge base or school calendar
- NEVER make up, invent, or guess information
- If you don't have specific information, say: "I don't have that specific information. Please contact the school office."
- For sensitive topics, redirect to Director John Lane

Be friendly, helpful, and professional. Keep responses concise but complete.`
  }

  const handleSavePrompt = async () => {
    setPromptSaveStatus('saving')
    try {
      await updateSystemPrompt({ systemPrompt })
      setPromptSaveStatus('saved')
      setTimeout(() => setPromptSaveStatus(null), 2000)
    } catch {
      setPromptSaveStatus('error')
      setTimeout(() => setPromptSaveStatus(null), 3000)
    }
  }

  const handleTemperatureChange = async (value) => {
    const newTemp = parseFloat(value)
    setTemperature(newTemp)
    setTempSaveStatus('saving')
    try {
      await updateTemperature({ temperature: newTemp })
      setTempSaveStatus('saved')
      setTimeout(() => setTempSaveStatus(null), 2000)
    } catch {
      setTempSaveStatus('error')
      setTimeout(() => setTempSaveStatus(null), 3000)
    }
  }

  const openAddKnowledgeModal = () => {
    setEditingKnowledge(null)
    setKnowledgeFormData({ topic: '', info: '' })
    setIsKnowledgeModalOpen(true)
  }

  const openEditKnowledgeModal = (item) => {
    setEditingKnowledge(item)
    setKnowledgeFormData({ topic: item.topic, info: item.info })
    setIsKnowledgeModalOpen(true)
  }

  const closeKnowledgeModal = () => {
    setIsKnowledgeModalOpen(false)
    setEditingKnowledge(null)
  }

  const handleKnowledgeSubmit = async (e) => {
    e.preventDefault()

    if (editingKnowledge) {
      await updateKnowledge({
        id: editingKnowledge.id,
        topic: knowledgeFormData.topic,
        info: knowledgeFormData.info,
      })
    } else {
      await addKnowledge({
        topic: knowledgeFormData.topic,
        info: knowledgeFormData.info,
      })
    }

    closeKnowledgeModal()
  }

  const handleDeleteKnowledge = async (id) => {
    if (confirm('Are you sure you want to delete this knowledge item?')) {
      await removeKnowledge({ id })
    }
  }

  const knowledge = aiSettings?.knowledge ?? []

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">AI Settings</h1>
        <p className="text-slate-600">Configure the AI assistant behavior</p>
      </div>

      {/* System Prompt Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">System Prompt</h2>
            <p className="text-sm text-slate-500">
              Instructions that define AI behavior
            </p>
          </div>
        </div>

        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none font-mono text-sm"
          rows={12}
          placeholder="Enter system prompt..."
        />

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setSystemPrompt(getDefaultPrompt())}
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Reset to default
          </button>
          <button
            onClick={handleSavePrompt}
            disabled={promptSaveStatus === 'saving'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-colors"
          >
            {promptSaveStatus === 'saving' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : promptSaveStatus === 'saved' ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved!
              </>
            ) : promptSaveStatus === 'error' ? (
              <>
                <AlertCircle className="w-4 h-4" />
                Error
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Prompt
              </>
            )}
          </button>
        </div>
      </div>

      {/* Temperature Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-orange-100 text-orange-700">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">Temperature</h2>
            <p className="text-sm text-slate-500">
              Controls response randomness (lower = more focused)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Focused</span>
            <span className="text-lg font-semibold text-slate-800">
              {temperature.toFixed(1)}
            </span>
            <span className="text-sm text-slate-600">Creative</span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => handleTemperatureChange(e.target.value)}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>0.0</span>
            <span>0.2 (Recommended)</span>
            <span>1.0</span>
          </div>

          {tempSaveStatus && (
            <div className={`text-sm ${tempSaveStatus === 'saved' ? 'text-green-600' : tempSaveStatus === 'error' ? 'text-red-600' : 'text-slate-500'}`}>
              {tempSaveStatus === 'saving' && 'Saving...'}
              {tempSaveStatus === 'saved' && 'Saved!'}
              {tempSaveStatus === 'error' && 'Error saving'}
            </div>
          )}
        </div>
      </div>

      {/* Knowledge Base Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-green-100 text-green-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Knowledge Base</h2>
              <p className="text-sm text-slate-500">
                Custom information for the AI to reference
              </p>
            </div>
          </div>
          <button
            onClick={openAddKnowledgeModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        {/* Knowledge List */}
        <div className="space-y-3">
          {knowledge.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p>No knowledge items yet</p>
              <button
                onClick={openAddKnowledgeModal}
                className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Add your first item
              </button>
            </div>
          ) : (
            knowledge.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-800 mb-1">
                      {item.topic}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {item.info}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditKnowledgeModal(item)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteKnowledge(item.id)}
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Knowledge Modal */}
      {isKnowledgeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                {editingKnowledge ? 'Edit Knowledge Item' : 'Add Knowledge Item'}
              </h2>
              <button
                onClick={closeKnowledgeModal}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleKnowledgeSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Topic *
                </label>
                <input
                  type="text"
                  value={knowledgeFormData.topic}
                  onChange={(e) =>
                    setKnowledgeFormData((prev) => ({
                      ...prev,
                      topic: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="e.g., Dress Code, Lunch Policy"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Information *
                </label>
                <textarea
                  value={knowledgeFormData.info}
                  onChange={(e) =>
                    setKnowledgeFormData((prev) => ({
                      ...prev,
                      info: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  rows={5}
                  placeholder="Enter the information the AI should know about this topic..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeKnowledgeModal}
                  className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                >
                  {editingKnowledge ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AISettingsPanel
