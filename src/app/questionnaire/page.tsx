'use client'

import { useState } from 'react'

const questions = [
  // Energy & Vitality
  {
    id: 'energy_level',
    category: 'Energy & Vitality',
    question: 'How would you rate your overall energy level?',
    options: ['Very low - always tired', 'Low - tired most of the time', 'Moderate - varies', 'Good - mostly energetic', 'Excellent - full of energy']
  },
  {
    id: 'morning_energy',
    category: 'Energy & Vitality',
    question: 'How do you feel when you wake up in the morning?',
    options: ['Exhausted, hard to get up', 'Groggy, takes time to wake up', 'Okay, neither good nor bad', 'Refreshed and ready', 'Energetic and alert']
  },
  {
    id: 'fatigue_time',
    category: 'Energy & Vitality',
    question: 'When do you typically feel most tired?',
    options: ['All day long', 'Morning', 'Afternoon (3-5 PM)', 'Evening', 'I rarely feel tired']
  },

  // Temperature Sensitivity
  {
    id: 'cold_feeling',
    category: 'Temperature Sensitivity',
    question: 'Do you often feel cold in your hands or feet?',
    options: ['Always, very cold', 'Often cold', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'cold_weather',
    category: 'Temperature Sensitivity',
    question: 'How sensitive are you to cold weather?',
    options: ['Very sensitive, always cold', 'Somewhat sensitive', 'Neutral', 'Prefer cooler weather', 'Love cold weather']
  },
  {
    id: 'lower_back_cold',
    category: 'Temperature Sensitivity',
    question: 'Do you feel cold in your lower back or knees?',
    options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never']
  },

  // Urinary & Sexual Health
  {
    id: 'urination_frequency',
    category: 'Urinary & Sexual Health',
    question: 'How often do you urinate at night?',
    options: ['0 times', '1 time', '2 times', '3 times or more']
  },
  {
    id: 'urination_urgency',
    category: 'Urinary & Sexual Health',
    question: 'Do you experience urgency or difficulty with urination?',
    options: ['Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'libido_level',
    category: 'Urinary & Sexual Health',
    question: 'How would you describe your libido (sexual drive)?',
    options: ['Very low', 'Low', 'Moderate', 'Good', 'High']
  },

  // Sleep Quality
  {
    id: 'sleep_quality',
    category: 'Sleep Quality',
    question: 'How would you rate your sleep quality?',
    options: ['Very poor - often wake up', 'Poor - restless sleep', 'Fair', 'Good', 'Excellent - deep sleep']
  },
  {
    id: 'difficulty_sleeping',
    category: 'Sleep Quality',
    question: 'Do you have difficulty falling asleep or staying asleep?',
    options: ['Yes, both', 'Difficulty falling asleep', 'Difficulty staying asleep', 'Sometimes', 'No issues']
  },
  {
    id: 'vivid_dreams',
    category: 'Sleep Quality',
    question: 'Do you have vivid dreams or nightmares?',
    options: ['Frequently', 'Often', 'Sometimes', 'Rarely', 'Never']
  },

  // Physical Symptoms
  {
    id: 'lower_back_pain',
    category: 'Physical Symptoms',
    question: 'Do you experience lower back pain or weakness?',
    options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'knee_weakness',
    category: 'Physical Symptoms',
    question: 'Do your knees feel weak or painful?',
    options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never']
  },
  {
    id: 'hair_condition',
    category: 'Physical Symptoms',
    question: 'How is the condition of your hair?',
    options: ['Thinning or falling out', 'Dry and brittle', 'Normal', 'Healthy and thick']
  },
  {
    id: 'hearing_issues',
    category: 'Physical Symptoms',
    question: 'Do you experience ringing in ears or hearing issues?',
    options: ['Yes, frequently', 'Sometimes', 'Rarely', 'Never']
  },

  // Emotional State
  {
    id: 'mood_level',
    category: 'Emotional State',
    question: 'How would you describe your typical mood?',
    options: ['Often depressed or anxious', 'Sometimes low', 'Neutral', 'Generally positive', 'Very positive']
  },
  {
    id: 'stress_level',
    category: 'Emotional State',
    question: 'How stressed do you feel on a daily basis?',
    options: ['Very high', 'High', 'Moderate', 'Low', 'Very low']
  },
  {
    id: 'concentration',
    category: 'Emotional State',
    question: 'How is your concentration and memory?',
    options: ['Poor', 'Below average', 'Average', 'Good', 'Excellent']
  },

  // Additional Info
  {
    id: 'age',
    category: 'Basic Information',
    question: 'What is your age group?',
    options: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+']
  },
  {
    id: 'gender',
    category: 'Basic Information',
    question: 'What is your gender?',
    options: ['Male', 'Female', 'Prefer not to say']
  }
]

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer })
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmit = async () => {
    if (!email || !name) {
      alert('Please fill in your name and email')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, answers })
      })
      
      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Submission failed. Please try again.')
      }
    } catch (error) {
      alert('Submission failed. Please try again.')
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-[#2d5a4a] mb-4">Assessment Submitted!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you, {name}! Your assessment has been received.
          </p>
          <div className="card text-left">
            <h2 className="text-xl font-semibold mb-4">What happens next:</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-600">
              <li>Our AI will analyze your responses using TCM principles</li>
              <li>A TCM practitioner will review the analysis</li>
              <li>You'll receive your personalized report within 24-48 hours at <strong>{email}</strong></li>
            </ol>
          </div>
          <a href="/" className="btn-secondary inline-block mt-8">Return Home</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#2d5a4a] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card">
          <div className="text-sm text-[#2d5a4a] font-medium mb-2">
            {currentQuestion.category}
          </div>
          <h2 className="text-xl font-semibold mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                  answers[currentQuestion.id] === option
                    ? 'border-[#2d5a4a] bg-[#2d5a4a]/10'
                    : 'border-gray-200 hover:border-[#2d5a4a] hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-gray-600 disabled:opacity-50"
          >
            ← Previous
          </button>
          
          {currentStep === questions.length - 1 && Object.keys(answers).length === questions.length ? (
            <button
              onClick={() => setCurrentStep(questions.length)}
              className="btn-primary"
            >
              Continue to Submit →
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(Math.min(questions.length - 1, currentStep + 1))}
              disabled={!answers[currentQuestion.id]}
              className="px-4 py-2 text-[#2d5a4a] disabled:opacity-50"
            >
              Next →
            </button>
          )}
        </div>

        {/* Submit Form */}
        {currentStep === questions.length && (
          <div className="card mt-8">
            <h2 className="text-xl font-semibold mb-6">Complete Your Assessment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="your@email.com"
                />
                <p className="text-sm text-gray-500 mt-1">Your report will be sent to this email</p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary w-full"
              >
                {submitting ? 'Submitting...' : 'Submit Assessment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
