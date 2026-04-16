'use client'

import { useState } from 'react'

const questions = [
  { id: 'energy_level', category: 'Energy & Vitality', question: 'How would you rate your overall energy level?', options: ['Very low', 'Low', 'Moderate', 'Good', 'Excellent'] },
  { id: 'morning_energy', category: 'Energy & Vitality', question: 'How do you feel when you wake up?', options: ['Exhausted', 'Groggy', 'Okay', 'Refreshed', 'Energetic'] },
  { id: 'cold_feeling', category: 'Temperature', question: 'Do you often feel cold in your hands or feet?', options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'] },
  { id: 'cold_back', category: 'Temperature', question: 'Do you feel cold in your lower back or knees?', options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never'] },
  { id: 'sleep_quality', category: 'Sleep', question: 'How would you rate your sleep quality?', options: ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent'] },
  { id: 'lower_back_pain', category: 'Physical', question: 'Do you experience lower back pain or weakness?', options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never'] },
  { id: 'libido_level', category: 'Health', question: 'How would you describe your libido?', options: ['Very low', 'Low', 'Moderate', 'Good', 'High'] },
  { id: 'urination_night', category: 'Health', question: 'How often do you urinate at night?', options: ['0 times', '1 time', '2 times', '3+ times'] },
  { id: 'stress_level', category: 'Mental', question: 'How stressed do you feel daily?', options: ['Very high', 'High', 'Moderate', 'Low', 'Very low'] },
  { id: 'age', category: 'Basic Info', question: 'What is your age group?', options: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'] },
]

export default function Questionnaire() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<string>('')

  const question = questions[step]
  const progress = ((step + 1) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [question.id]: answer })
    if (step < questions.length - 1) setStep(step + 1)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      })
      const data = await res.json()
      if (res.ok && data.analysis) {
        setResult(data.analysis)
      } else {
        alert('Analysis failed. Please try again.')
      }
    } catch {
      alert('Analysis failed. Please try again.')
    }
    setSubmitting(false)
  }

  const showForm = step === questions.length - 1 && answers[question.id]

  // WhatsApp 号码（用户需要注册后告诉我）
  const whatsappNumber = '8615607671586' // 例如: 8613800138000
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi, I just completed the TCM assessment and would like to consult with a practitioner.`

  if (result) {
    return (
      <main style={{ minHeight: '100vh', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d5a4a', marginBottom: '0.5rem' }}>Your TCM Assessment Results</h1>
            <p style={{ color: '#6b7280' }}>Based on Traditional Chinese Medicine principles</p>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: '#374151' }}>{result}</div>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', borderRadius: '0.75rem', border: '2px solid #2d5a4a', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d5a4a', marginBottom: '1rem' }}>📧 Get Personalized Consultation</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
              For detailed diagnosis and treatment recommendations, consult with our TCM practitioner via WhatsApp.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: 'white', padding: '1rem 2rem', borderRadius: '9999px', fontWeight: '600', textDecoration: 'none', fontSize: '1.1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>💬</span> Chat on WhatsApp
            </a>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Response within 24 hours
            </p>
          </div>

          <div style={{ backgroundColor: '#fef3c7', borderRadius: '0.75rem', padding: '1rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#92400e' }}>
              ⚠️ <strong>Disclaimer:</strong> This assessment is for educational purposes only and should not replace professional medical advice.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="/" style={{ color: '#2d5a4a', textDecoration: 'underline' }}>← Return Home</a>
          </div>
        </div>
      </main>
    )
  }

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
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#2d5a4a' }}>Ready to Get Your Results?</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Our AI will analyze your responses using Traditional Chinese Medicine principles.</p>
            <button onClick={handleSubmit} disabled={submitting} style={{ width: '100%', backgroundColor: '#2d5a4a', color: 'white', padding: '1rem', borderRadius: '0.5rem', fontWeight: '600', fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>
              {submitting ? 'Analyzing...' : 'Get My Free Assessment'}
            </button>
          </div>
        )}

        {/* Navigation */}
        {!showForm && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ color: '#6b7280', cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.5 : 1, background: 'none', border: 'none' }}>← Previous</button>
            <button onClick={() => setStep(Math.min(questions.length - 1, step + 1))} disabled={!answers[question.id]} style={{ color: '#2d5a4a', cursor: answers[question.id] ? 'pointer' : 'default', opacity: answers[question.id] ? 1 : 0.5, background: 'none', border: 'none' }}>Next →</button>
          </div>
        )}
      </div>
    </main>
  )
}
