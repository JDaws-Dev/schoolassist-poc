import { useEffect, useMemo, useState } from 'react'
import { Brain, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { useAISettings, useAISettingsMutations } from '@/hooks/useConvex'

export function AISettingsPanel() {
  const settings = useAISettings()
  const { updateSystemPrompt, updateTemperature, addKnowledge, updateKnowledge, removeKnowledge } =
    useAISettingsMutations()
  const [prompt, setPrompt] = useState(settings?.systemPrompt ?? '')
  const [temp, setTemp] = useState(settings?.temperature ?? 0.2)
  const [topic, setTopic] = useState('')
  const [info, setInfo] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTopic, setEditingTopic] = useState('')
  const [editingInfo, setEditingInfo] = useState('')

  const knowledge = useMemo(() => settings?.knowledge ?? [], [settings])

  useEffect(() => {
    if (settings?.systemPrompt !== undefined) setPrompt(settings.systemPrompt)
    if (settings?.temperature !== undefined) setTemp(settings.temperature)
  }, [settings])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="ai-prompt">System Prompt</Label>
          <Textarea
            id="ai-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Update the assistant system prompt"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => updateSystemPrompt({ systemPrompt: prompt })}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Prompt
          </Button>
        </div>

        <div className="space-y-3">
          <Label>Temperature ({temp.toFixed(2)})</Label>
          <Slider
            value={[temp]}
            max={1}
            step={0.05}
            onValueChange={(value) => setTemp(value[0])}
          />
          <Button type="button" variant="secondary" onClick={() => updateTemperature({ temperature: temp })}>
            <Save className="mr-2 h-4 w-4" />
            Save Temperature
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="knowledge-topic">Add Knowledge Topic</Label>
            <Input
              id="knowledge-topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Topic"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="knowledge-info">Information</Label>
            <Textarea
              id="knowledge-info"
              value={info}
              onChange={(event) => setInfo(event.target.value)}
              placeholder="Details Arti should know"
            />
          </div>
          <Button
            type="button"
            onClick={() => {
              if (!topic.trim() || !info.trim()) return
              addKnowledge({ topic, info })
              setTopic('')
              setInfo('')
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Knowledge
          </Button>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Knowledge Base</p>
          {knowledge.length === 0 ? (
            <p className="text-sm text-muted-foreground">No knowledge entries yet.</p>
          ) : (
            knowledge.map((item) => {
              const isEditing = editingId === item.id
              return (
                <div key={item.id} className="rounded-2xl border border-border/60 bg-background p-4 text-sm">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input value={editingTopic} onChange={(event) => setEditingTopic(event.target.value)} />
                      <Textarea value={editingInfo} onChange={(event) => setEditingInfo(event.target.value)} />
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            updateKnowledge({ id: item.id, topic: editingTopic, info: editingInfo })
                            setEditingId(null)
                            setEditingTopic('')
                            setEditingInfo('')
                          }}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(null)
                            setEditingTopic('')
                            setEditingInfo('')
                          }}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{item.topic}</p>
                        <p className="text-xs text-muted-foreground">{item.info}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(item.id)
                            setEditingTopic(item.topic)
                            setEditingInfo(item.info)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => removeKnowledge({ id: item.id })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
