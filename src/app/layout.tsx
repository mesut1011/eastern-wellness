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
      <body className="min-h-screen bg-[#faf8f5]">
        <nav className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-[#2d5a4a]">
              Eastern Wellness
            </a>
            <div className="flex gap-6">
              <a href="/questionnaire" className="text-gray-600 hover:text-[#2d5a4a]">Start Assessment</a>
              <a href="#about" className="text-gray-600 hover:text-[#2d5a4a]">About TCM</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-[#2d5a4a] text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm opacity-80">
              © 2026 Eastern Wellness. For educational purposes only. Not a substitute for professional medical advice.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
