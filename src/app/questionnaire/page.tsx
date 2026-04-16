'use client'

import { useState } from 'react'

const questions = [
  { id: 'energy_level', category: 'Energy & Vitality', question: 'How would you rate your overall energy level?', options: ['Very low', 'Low', 'Moderate', 'Good', 'Excellent'] },
  { id: 'cold_feeling', category: 'Temperature', question: 'Do you often feel cold in your hands or feet?', options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'] },
  { id: 'sleep_quality', category: 'Sleep', question: 'How would you rate your sleep quality?', options: ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent'] },
  { id: 'lower_back_pain', category: 'Physical', question: 'Do you experience lower back pain or weakness?', options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never'] },
  { id: 'libido_level', category: 'Health', question: 'How would you describe your libido?', options: ['Very low', 'Low', 'Moderate', 'Good', 'High'] },
  { id: 'age', category: 'Basic Info', question: 'What is your age group?', options: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'] },
]

export default function Questionnaire() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const question = questions[step]
  const progress = ((step + 1) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [question.id]: answer })
    if (step < questions.length - 1) setStep(step + 1)
  }

  const handleSubmit = async () => {
    if (!email || !name) {
      alert('Please fill in your name and email')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, answers })
      })
      if (res.ok) setDone(true)
      else alert('Submission failed')
    } catch {
      alert('Submission failed')
    }
    setSubmitting(false)
  }

  if (done) {
    return (
      <main style={{ minHeight: '100vh', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '40rem', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d5a4a', marginBottom: '1rem' }}>Assessment Submitted!</h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem' }}>Thank you, {name}! Your report will be sent to {email} within 24-48 hours.</p>
          <a href="/" style={{ backgroundColor: '#2d5a4a', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none' }}>Return Home</a>
        </div>
      </main>
    )
  }

  const showForm = step === questions.length - 1 && answers[question.id]

  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '0.5rem', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: '#2d5a4a', width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Question */}
        {!showForm ? (
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#2d5a4a', fontWeight: '500', marginBottom: '0.5rem' }}>{question.category}</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>{question.question}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {question.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: answers[question.id] === opt ? '2px solid #2d5a4a' : '1px solid #e5e7eb', backgroundColor: answers[question.id] === opt ? '#f0fdf4' : 'white', cursor: 'pointer' }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Complete Your Assessment</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} placeholder="Enter your name" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} placeholder="your@email.com" />
            </div>
            <button onClick={handleSubmit} disabled={submitting} style={{ width: '100%', backgroundColor: '#2d5a4a', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '500', border: 'none', cursor: 'pointer' }}>
              {submitting ? 'Submitting...' : 'Submit Assessment'}
            </button>
          </div>
        )}

        {/* Navigation */}
        {!showForm && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ color: '#6b7280', cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.5 : 1 }}>← Previous</button>
            <button onClick={() => setStep(Math.min(questions.length - 1, step + 1))} disabled={!answers[question.id]} style={{ color: '#2d5a4a', cursor: answers[question.id] ? 'pointer' : 'default', opacity: answers[question.id] ? 1 : 0.5 }}>Next →</button>
          </div>
        )}
      </div>
    </main>
  )
}
