import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, MessageCircle, BookOpen, Users, Mail } from 'lucide-react'

const PARENT_PASSWORD = 'artios2026'
const PARENT_KEY = 'parentLoggedIn'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/'

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (password.trim() === PARENT_PASSWORD) {
      sessionStorage.setItem(PARENT_KEY, 'true')
      navigate(from, { replace: true })
      return
    }
    setError('Incorrect password. Please try again.')
  }

  const features = [
    { icon: Calendar, title: 'School Calendar', description: 'View upcoming events and important dates' },
    { icon: MessageCircle, title: 'AI Assistant', description: 'Get instant answers about school info' },
    { icon: BookOpen, title: 'Resources', description: 'Access forms, policies, and quick links' },
    { icon: Users, title: 'Community', description: 'Connect with other Artios families' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Hero Section */}
      <div className="px-5 pt-12 pb-8 text-center">
        <img
          src="/artios-logo.png"
          alt="Artios Academies"
          className="mx-auto h-24 w-auto mb-6"
        />
        <h1 className="font-display text-3xl font-bold text-primary mb-3">
          Artios Connect
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Your parent hub for Artios Academies of Sugar Hill — a Christian homeschool hybrid academy
        </p>
      </div>

      {/* Features */}
      <div className="px-5 pb-8">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-4 border border-border/50"
            >
              <feature.icon className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Login Card */}
      <div className="px-5 pb-12">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Parent Login</CardTitle>
            <CardDescription>
              Enter the parent password to access Artios Connect
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter parent password"
                />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button type="submit" className="w-full">Sign In</Button>
            </form>

            {/* Contact Info */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-3">
                Need the password? Contact the school office:
              </p>
              <a
                href="mailto:jmlane@artiosacademies.com?subject=Artios Connect Password Request"
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                jmlane@artiosacademies.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
