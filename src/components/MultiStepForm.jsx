/**
 * MultiStepForm - 4-step onboarding form with MailerLite integration
 */
import { useState } from 'react'

const API_TOKEN = import.meta.env.VITE_MAILERLITE_API_TOKEN || 'API_TOKEN_PLACEHOLDER'

const steps = [
  {
    question: 'Co chcesz osiągnąć z PRD?',
    field: 'interest_topic',
    options: [
      { value: 'Lepsze planowanie', label: 'Lepsze planowanie', icon: '📋' },
      { value: 'Komunikacja z zespołem', label: 'Komunikacja z zespołem', icon: '👥' },
      { value: 'Prezentacja stakeholderom', label: 'Prezentacja stakeholderom', icon: '📊' }
    ]
  },
  {
    question: 'Jaki jest Twój poziom doświadczenia?',
    field: 'level',
    options: [
      { value: 'Junior PM', label: 'Junior PM', icon: '🌱' },
      { value: 'Mid PM', label: 'Mid PM', icon: '💼' },
      { value: 'Senior PM', label: 'Senior PM', icon: '🎯' },
      { value: 'Founder', label: 'Founder', icon: '🚀' }
    ]
  },
  {
    question: 'Jak duży jest Twój zespół?',
    field: 'team_size',
    options: [
      { value: 'Solo', label: 'Solo', icon: '👤' },
      { value: '2-5 osób', label: '2-5 osób', icon: '👥' },
      { value: '6-20 osób', label: '6-20 osób', icon: '👨‍👩‍👧‍👦' },
      { value: '20+ osób', label: '20+ osób', icon: '🏢' }
    ]
  },
  {
    question: 'Preferowany format pracy?',
    field: 'preferred_format',
    options: [
      { value: 'Agile', label: 'Agile', icon: '🔄' },
      { value: 'Waterfall', label: 'Waterfall', icon: '📈' },
      { value: 'Hybrid', label: 'Hybrid', icon: '⚡' }
    ]
  }
]

/**
 * Update subscriber in MailerLite with field value
 */
const updateSubscriber = async (email, fieldName, value) => {
  console.log('=== MAILERLITE API CALL ===')
  console.log('Email:', email)
  console.log('Field:', fieldName)
  console.log('Value:', value)
  console.log('API Token:', API_TOKEN ? 'Token loaded (length: ' + API_TOKEN.length + ')' : 'TOKEN MISSING!')

  try {
    const requestBody = {
      email: email,
      fields: {
        [fieldName]: value
      }
    }

    console.log('Request body:', JSON.stringify(requestBody, null, 2))

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(requestBody)
    })

    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)

    const responseData = await response.json()
    console.log('Response data:', responseData)

    if (!response.ok) {
      console.error('API ERROR:', responseData)
      throw new Error(responseData.message || 'Failed to update subscriber')
    }

    console.log('✅ MailerLite update successful')
    return responseData
  } catch (error) {
    console.error('❌ MailerLite update error:', error)
    // Don't throw - we don't want to block the user flow
    return null
  }
}

function MultiStepForm({ email, name, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedValue, setSelectedValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [answers, setAnswers] = useState({})

  const step = steps[currentStep]
  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleOptionSelect = (value) => {
    setSelectedValue(value)
  }

  const handleNext = async () => {
    if (!selectedValue) return

    setIsLoading(true)

    // Save answer
    const newAnswers = { ...answers, [step.field]: selectedValue }
    setAnswers(newAnswers)

    // Update MailerLite
    await updateSubscriber(email, step.field, selectedValue)

    setIsLoading(false)

    // Move to next step or complete
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedValue('')
    } else {
      onComplete(newAnswers)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-secondary">
            Krok {currentStep + 1} z {totalSteps}
          </span>
          <span className="text-sm font-semibold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Welcome message on first step */}
      {currentStep === 0 && name && (
        <div className="mb-6 p-4 bg-accent-mint/10 rounded-xl border border-accent-mint/20">
          <p className="text-sm text-secondary">
            <span className="font-semibold">Cześć {name}!</span> Odpowiedz na kilka pytań, żebyśmy mogli lepiej dopasować narzędzie do Twoich potrzeb.
          </p>
        </div>
      )}

      {/* Question */}
      <h3 className="text-xl font-bold text-secondary mb-6">
        {step.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {step.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleOptionSelect(option.value)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center gap-4 ${
              selectedValue === option.value
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className={`font-medium ${
              selectedValue === option.value ? 'text-primary' : 'text-secondary'
            }`}>
              {option.label}
            </span>
            {selectedValue === option.value && (
              <svg className="w-5 h-5 text-primary ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!selectedValue || isLoading}
        className="w-full bg-primary hover:bg-primary-hover text-white px-6 py-4 rounded-xl font-semibold shadow-btn hover:shadow-btn-hover transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Zapisywanie...</span>
          </>
        ) : currentStep === totalSteps - 1 ? (
          <>
            <span>Przejdź do generatora</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        ) : (
          <>
            <span>Dalej</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      {/* Step dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'bg-primary w-6'
                : index < currentStep
                  ? 'bg-accent-mint'
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default MultiStepForm
