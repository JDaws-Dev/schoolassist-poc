// Vercel serverless function to proxy Google Calendar ICS feed
// This avoids CORS issues when fetching the calendar from the browser

export default async function handler(req, res) {
  const calendarUrl = process.env.GOOGLE_CALENDAR_URL

  if (!calendarUrl) {
    return res.status(500).json({ error: 'Calendar URL not configured' })
  }

  try {
    const response = await fetch(calendarUrl, {
      headers: {
        'User-Agent': 'ArtiosConnect/1.0',
      },
    })

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch calendar: ${response.status}`
      })
    }

    const icsContent = await response.text()

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=300') // Cache for 5 minutes
    return res.status(200).send(icsContent)
  } catch (error) {
    console.error('Calendar proxy error:', error)
    return res.status(500).json({
      error: 'Failed to fetch calendar',
      details: error.message
    })
  }
}
