import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eastern Wellness - TCM Health Assessment',
  description: 'Traditional Chinese Medicine health assessment for vitality and wellness',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', backgroundColor: '#faf8f5' }}>
        <nav style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d5a4a' }}>
              Eastern Wellness
            </a>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="/questionnaire" style={{ color: '#4b5563' }}>Start Assessment</a>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ backgroundColor: '#2d5a4a', color: 'white', padding: '2rem', marginTop: '4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            © 2026 Eastern Wellness. For educational purposes only.
          </p>
        </footer>
      </body>
    </html>
  )
}
