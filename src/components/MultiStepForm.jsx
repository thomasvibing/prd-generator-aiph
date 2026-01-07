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
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-white/50 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-mint/5 to-transparent rounded-bl-2xl" />

      {/* Progress indicator */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-secondary">
            Krok {currentStep + 1} z {totalSteps}
          </span>
          <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent-mint bg-clip-text text-transparent">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-primary via-primary-light to-accent-mint rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Welcome message on first step */}
      {currentStep === 0 && name && (
        <div className="relative mb-6 p-4 bg-gradient-to-r from-accent-mint/10 to-primary/5 rounded-xl border border-accent-mint/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-mint to-teal-500 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-sm">👋</span>
            </div>
            <p className="text-sm text-secondary">
              <span className="font-semibold">Cześć {name}!</span> Odpowiedz na kilka pytań, żebyśmy mogli lepiej dopasować narzędzie do Twoich potrzeb.
            </p>
          </div>
        </div>
      )}

      {/* Question */}
      <h3 className="relative text-xl font-bold text-secondary mb-6">
        {step.question}
      </h3>

      {/* Options */}
      <div className="relative space-y-3 mb-8">
        {step.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleOptionSelect(option.value)}
            className={`group w-full p-4 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer flex items-center gap-4 ${
              selectedValue === option.value
                ? 'border-primary bg-gradient-to-r from-primary/5 to-primary/10 shadow-md scale-[1.02]'
                : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50 hover:shadow-sm'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              selectedValue === option.value
                ? 'bg-gradient-to-br from-primary to-primary-light shadow-md'
                : 'bg-gray-100 group-hover:bg-gray-200'
            }`}>
              <span className="text-xl">{option.icon}</span>
            </div>
            <span className={`font-medium transition-colors duration-300 ${
              selectedValue === option.value ? 'text-primary' : 'text-secondary'
            }`}>
              {option.label}
            </span>
            <div className={`ml-auto w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              selectedValue === option.value
                ? 'bg-primary shadow-sm'
                : 'border-2 border-gray-200 group-hover:border-primary/30'
            }`}>
              {selectedValue === option.value && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!selectedValue || isLoading}
        className="relative w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-hover hover:to-primary text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:from-gray-400 disabled:to-gray-500 flex items-center justify-center gap-2 cursor-pointer overflow-hidden group"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

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
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        ) : (
          <>
            <span>Dalej</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      {/* Step dots with animation */}
      <div className="relative flex items-center justify-center gap-3 mt-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`relative rounded-full transition-all duration-500 ${
              index === currentStep
                ? 'w-8 h-3 bg-gradient-to-r from-primary to-primary-light shadow-md'
                : index < currentStep
                  ? 'w-3 h-3 bg-gradient-to-r from-accent-mint to-teal-500'
                  : 'w-3 h-3 bg-gray-200'
            }`}
          >
            {index === currentStep && (
              <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiStepForm
