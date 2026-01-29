import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import App from './App'
import './index.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

const convexUrl = import.meta.env.VITE_CONVEX_URL

function Root() {
  if (!convexUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Convex Not Configured</CardTitle>
            <CardDescription>
              Set VITE_CONVEX_URL in your environment variables to enable live data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <code className="rounded-full bg-muted px-3 py-2 text-sm">npx convex dev</code>
          </CardContent>
        </Card>
      </div>
    )
  }

  const convex = new ConvexReactClient(convexUrl)

  return (
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
