/**
 * PRDForm - Main form component for PRD generator
 * Contains all 10 sections of the PRD form with autosave
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'
import FormSection from './FormSection'
import PDFGenerator from './PDFGenerator'
import { loadPrdData, savePrdData } from '../utils/localStorage'

// Example PRD template
const examplePrdData = {
  title: 'System rekomendacji produktów AI',
  author: 'Anna Kowalska',
  team: 'Product Team, AI/ML Team',
  overview: 'System rekomendacji oparty na sztucznej inteligencji, który personalizuje doświadczenie zakupowe użytkowników. Wykorzystuje algorytmy machine learning do analizy zachowań użytkowników i sugerowania produktów dopasowanych do ich preferencji.',
  problem: 'Obecnie użytkownicy muszą ręcznie przeszukiwać katalog produktów, co prowadzi do niskiej konwersji (2.1%) i wysokiego współczynnika porzuceń koszyka (68%). Brak personalizacji sprawia, że użytkownicy nie odkrywają produktów, które mogłyby ich zainteresować.',
  objectives: [
    'Zwiększyć współczynnik konwersji o 25% w ciągu 6 miesięcy',
    'Zmniejszyć współczynnik porzuceń koszyka o 15%',
    'Osiągnąć CTR rekomendacji na poziomie 12%'
  ],
  constraints: [
    'Budżet: 150 000 PLN na rozwój i wdrożenie',
    'Timeline: MVP w Q2 2025, pełna wersja w Q3 2025',
    'Wykorzystanie istniejącej infrastruktury AWS'
  ],
  personas: [
    { name: 'Kasia - Młoda Profesjonalistka', description: 'Ma 28 lat, pracuje w korporacji, robi zakupy online 2-3 razy w tygodniu. Ceni wygodę i personalizację.' },
    { name: 'Marek - Rodzinny Kupujący', description: 'Ma 42 lata, robi zakupy dla 4-osobowej rodziny. Szuka promocji i produktów o dobrej wartości.' },
    { name: 'Zofia - Seniorka', description: 'Ma 65 lat, dopiero zaczyna robić zakupy online. Potrzebuje prostego i intuicyjnego interfejsu.' }
  ],
  useCases: [
    'Użytkownik wchodzi na stronę główną → System wyświetla spersonalizowane rekomendacje oparte na historii przeglądania → Użytkownik klika w rekomendowany produkt → Dodaje do koszyka',
    'Użytkownik przegląda stronę produktu → System pokazuje "Klienci kupili również" → Użytkownik dodaje dodatkowy produkt zwiększając wartość koszyka',
    'Użytkownik otrzymuje email z rekomendacjami → Klika w produkt → Zostaje przekierowany na stronę produktu z zachowanym kontekstem'
  ],
  featuresIn: '• Rekomendacje na stronie głównej (Top 10 dla użytkownika)\n• Sekcja "Podobne produkty" na stronie produktu\n• Widget "Klienci kupili również"\n• Personalizowane emaile z rekomendacjami (1x tydzień)\n• Panel A/B testów dla optymalizacji algorytmu\n• Dashboard z metrykami efektywności',
  featuresOut: '• Rekomendacje w aplikacji mobilnej (faza 2)\n• Integracja z chatbotem (wymaga osobnego projektu)\n• Rekomendacje w czasie rzeczywistym (ograniczenia infrastrukturalne)\n• Personalizacja cenowa (kwestie prawne)',
  successMetrics: '• CTR rekomendacji: cel 12% (obecnie brak danych)\n• Wzrost konwersji: +25% vs baseline\n• Wartość koszyka: +10% dla użytkowników z rekomendacji\n• NPS modułu rekomendacji: >40\n• Czas ładowania widgetów: <200ms (P95)'
}

const initialPrdData = {
  // Header
  title: '',
  author: '',
  team: '',

  // One Pager
  overview: '',
  problem: '',
  objectives: ['', '', ''],
  constraints: ['', '', ''],

  // Personas
  personas: [
    { name: '', description: '' },
    { name: '', description: '' },
    { name: '', description: '' }
  ],

  // Use Cases
  useCases: ['', '', ''],

  // PRD
  featuresIn: '',
  featuresOut: '',
  successMetrics: ''
}

// Input component for consistent styling
function Input({ label, placeholder, value, onChange, type = 'text' }) {
  return (
    <div className="group">
      {label && (
        <label className="block text-sm font-medium text-secondary mb-1.5 group-focus-within:text-primary transition-colors">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-secondary placeholder:text-text-muted shadow-sm hover:shadow-md hover:border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-md transition-all duration-200"
      />
    </div>
  )
}

// Textarea component for consistent styling
function Textarea({ label, placeholder, value, onChange, rows = 4 }) {
  return (
    <div className="group">
      {label && (
        <label className="block text-sm font-medium text-secondary mb-1.5 group-focus-within:text-primary transition-colors">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-secondary placeholder:text-text-muted shadow-sm hover:shadow-md hover:border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-md transition-all duration-200 resize-none"
      />
    </div>
  )
}

function PRDForm({ userEmail }) {
  const [prdData, setPrdData] = useState(initialPrdData)
  const [saveStatus, setSaveStatus] = useState(null) // null, 'saving', 'saved'
  const saveTimeoutRef = useRef(null)
  const isFirstLoad = useRef(true)

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadPrdData()
    if (savedData) {
      setPrdData(savedData)
    }
    isFirstLoad.current = false
  }, [])

  // Calculate form completion progress
  const calculateProgress = () => {
    const fields = [
      prdData.title,
      prdData.author,
      prdData.team,
      prdData.overview,
      prdData.problem,
      ...prdData.objectives,
      ...prdData.constraints,
      ...prdData.personas.map(p => p.name),
      ...prdData.personas.map(p => p.description),
      ...prdData.useCases,
      prdData.featuresIn,
      prdData.featuresOut,
      prdData.successMetrics
    ]
    const filled = fields.filter(f => f && f.trim()).length
    return Math.round((filled / fields.length) * 100)
  }

  const progress = calculateProgress()
  const prevProgressRef = useRef(progress)
  const hasShownConfetti = useRef(false)

  // Confetti celebration when reaching 100%
  useEffect(() => {
    if (progress === 100 && prevProgressRef.current < 100 && !hasShownConfetti.current) {
      hasShownConfetti.current = true
      // Fire confetti from both sides
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#4d65ff', '#00d9a5', '#ff6b9d', '#ffd93d']
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#4d65ff', '#00d9a5', '#ff6b9d', '#ffd93d']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }
    if (progress < 100) {
      hasShownConfetti.current = false
    }
    prevProgressRef.current = progress
  }, [progress])

  // Load example template
  const handleLoadExample = () => {
    if (window.confirm('Czy chcesz załadować przykładowy PRD? Obecne dane zostaną zastąpione.')) {
      setPrdData(examplePrdData)
      savePrdData(examplePrdData)
    }
  }

  // Debounced autosave (2 seconds)
  useEffect(() => {
    if (isFirstLoad.current) return

    setSaveStatus('saving')

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      savePrdData(prdData)
      setSaveStatus('saved')

      // Clear "saved" status after 2 seconds
      setTimeout(() => setSaveStatus(null), 2000)
    }, 2000)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [prdData])

  // Update handler for simple fields
  const handleChange = useCallback((field, value) => {
    setPrdData(prev => ({ ...prev, [field]: value }))
  }, [])

  // Update handler for array fields (objectives, constraints, useCases)
  const handleArrayChange = useCallback((field, index, value) => {
    setPrdData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }, [])

  // Update handler for personas
  const handlePersonaChange = useCallback((index, key, value) => {
    setPrdData(prev => ({
      ...prev,
      personas: prev.personas.map((persona, i) =>
        i === index ? { ...persona, [key]: value } : persona
      )
    }))
  }, [])

  // Clear form
  const handleClear = () => {
    if (window.confirm('Czy na pewno chcesz wyczyścić formularz? Wszystkie dane zostaną usunięte.')) {
      setPrdData(initialPrdData)
      savePrdData(null)
      setSaveStatus(null)
    }
  }

  // Check if form is empty
  const isFormEmpty = () => {
    return (
      !prdData.title &&
      !prdData.author &&
      !prdData.team &&
      !prdData.overview &&
      !prdData.problem &&
      prdData.objectives.every(o => !o) &&
      prdData.constraints.every(c => !c) &&
      prdData.personas.every(p => !p.name && !p.description) &&
      prdData.useCases.every(u => !u) &&
      !prdData.featuresIn &&
      !prdData.featuresOut &&
      !prdData.successMetrics
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress bar and save indicator */}
      <div className="sticky top-[72px] z-10 -mx-6 md:-mx-8 px-6 md:px-8 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100 -mt-6 md:-mt-8 mb-6 rounded-t-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-secondary ">Postęp</span>
            <span className={`text-sm font-bold ${progress === 100 ? 'text-accent-mint' : 'text-primary'}`}>
              {progress}%
            </span>
            {progress === 100 && (
              <span className="text-xs bg-accent-mint/20 text-accent-mint px-2 py-0.5 rounded-full font-medium animate-fade-in">
                Kompletny!
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Load example button */}
            <button
              type="button"
              onClick={handleLoadExample}
              className="text-xs text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Załaduj przykład
            </button>
            {/* Animated save indicator */}
            <div className="h-6 flex items-center">
              {saveStatus === 'saving' && (
                <span className="flex items-center gap-2 text-sm text-text-secondary animate-pulse">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Zapisywanie...
                </span>
              )}
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-2 text-sm text-accent-mint font-medium animate-fade-in">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Zapisano automatycznie
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out relative ${
              progress === 100
                ? 'bg-accent-mint animate-progress-pulse-complete'
                : progress >= 80
                  ? 'bg-gradient-to-r from-primary to-primary-light animate-progress-pulse'
                  : 'bg-gradient-to-r from-primary to-primary-light'
            }`}
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer overlay when progress > 50% */}
            {progress > 50 && progress < 100 && (
              <div className="absolute inset-0 progress-shimmer rounded-full" />
            )}
          </div>
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* Section 1: Header */}
        <FormSection title="Nagłówek" number="1" icon="header">
          <Input
            label="Tytuł PRD"
            placeholder="np. System rekomendacji produktów"
            value={prdData.title}
            onChange={(value) => handleChange('title', value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Autor"
              placeholder="Imię i nazwisko"
              value={prdData.author}
              onChange={(value) => handleChange('author', value)}
            />
            <Input
              label="Zespół"
              placeholder="np. Product Team, Engineering"
              value={prdData.team}
              onChange={(value) => handleChange('team', value)}
            />
          </div>
        </FormSection>

        {/* Section 2: Overview */}
        <FormSection title="Przegląd" number="2" icon="overview">
          <Textarea
            label="Overview"
            placeholder="Krótki opis produktu/funkcjonalności. Co to jest i dlaczego jest ważne?"
            value={prdData.overview}
            onChange={(value) => handleChange('overview', value)}
            rows={5}
          />
        </FormSection>

        {/* Section 3: Problem Statement */}
        <FormSection title="Problem" number="3" icon="problem">
          <Textarea
            label="Opis problemu"
            placeholder="Jaki problem rozwiązujemy? Dlaczego jest to ważne dla użytkowników i biznesu?"
            value={prdData.problem}
            onChange={(value) => handleChange('problem', value)}
            rows={5}
          />
        </FormSection>

        {/* Section 4: Objectives */}
        <FormSection title="Cele" number="4" icon="objectives">
          <p className="text-sm text-text-secondary mb-3">
            Zdefiniuj 3 kluczowe cele, które chcesz osiągnąć.
          </p>
          {prdData.objectives.map((objective, index) => (
            <Input
              key={index}
              label={`Cel ${index + 1}`}
              placeholder={`np. ${index === 0 ? 'Zwiększyć konwersję o 15%' : index === 1 ? 'Skrócić czas realizacji o 30%' : 'Poprawić satysfakcję klientów'}`}
              value={objective}
              onChange={(value) => handleArrayChange('objectives', index, value)}
            />
          ))}
        </FormSection>

        {/* Section 5: Constraints */}
        <FormSection title="Ograniczenia" number="5" icon="constraints">
          <p className="text-sm text-text-secondary mb-3">
            Jakie są ograniczenia projektu (czas, budżet, technologia)?
          </p>
          {prdData.constraints.map((constraint, index) => (
            <Input
              key={index}
              label={`Ograniczenie ${index + 1}`}
              placeholder={`np. ${index === 0 ? 'Budżet: 50 000 PLN' : index === 1 ? 'Deadline: Q2 2025' : 'Tylko istniejący stack technologiczny'}`}
              value={constraint}
              onChange={(value) => handleArrayChange('constraints', index, value)}
            />
          ))}
        </FormSection>

        {/* Section 6: Personas */}
        <FormSection title="Persony" number="6" icon="personas">
          <p className="text-sm text-text-secondary mb-4">
            Opisz kluczowych użytkowników produktu.
          </p>
          <div className="grid gap-4">
            {prdData.personas.map((persona, index) => (
              <div
                key={index}
                className="group/card bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar placeholder */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${index === 0 ? 'bg-accent-pink' : index === 1 ? 'bg-primary' : 'bg-accent-mint'}`}>
                    {persona.name ? persona.name.charAt(0).toUpperCase() : (index + 1)}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="group">
                      <label className="block text-xs font-medium text-text-muted mb-1 group-focus-within:text-primary transition-colors">
                        Nazwa persony
                      </label>
                      <input
                        type="text"
                        placeholder={`np. ${index === 0 ? 'Kasia - Młoda Profesjonalistka' : index === 1 ? 'Marek - Doświadczony Manager' : 'Zofia - Nowy Użytkownik'}`}
                        value={persona.name}
                        onChange={(e) => handlePersonaChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-secondary font-medium placeholder:text-text-muted placeholder:font-normal shadow-sm hover:shadow hover:bg-white focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-md transition-all duration-200"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-medium text-text-muted mb-1 group-focus-within:text-primary transition-colors">
                        Opis
                      </label>
                      <textarea
                        placeholder="Krótki opis: wiek, rola, potrzeby, zachowania..."
                        value={persona.description}
                        onChange={(e) => handlePersonaChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-secondary placeholder:text-text-muted shadow-sm hover:shadow hover:bg-white focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-md transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FormSection>

        {/* Section 7: Use Cases */}
        <FormSection title="Scenariusze użycia" number="7" icon="useCases">
          <p className="text-sm text-text-secondary mb-3">
            Opisz typowe scenariusze korzystania z produktu.
          </p>
          {prdData.useCases.map((useCase, index) => (
            <Textarea
              key={index}
              label={`Scenariusz ${index + 1}`}
              placeholder={`np. ${index === 0 ? 'Użytkownik wchodzi na stronę, przegląda produkty i dodaje do koszyka...' : index === 1 ? 'Administrator loguje się do panelu, sprawdza raporty...' : 'Klient otrzymuje powiadomienie o promocji i klika link...'}`}
              value={useCase}
              onChange={(value) => handleArrayChange('useCases', index, value)}
              rows={3}
            />
          ))}
        </FormSection>

        {/* Section 8: Features In */}
        <FormSection title="Funkcjonalności (In Scope)" number="8" icon="featuresIn">
          <Textarea
            label="Co wchodzi w zakres"
            placeholder="Lista funkcjonalności, które zostaną zaimplementowane:&#10;• Funkcja 1&#10;• Funkcja 2&#10;• Funkcja 3"
            value={prdData.featuresIn}
            onChange={(value) => handleChange('featuresIn', value)}
            rows={6}
          />
        </FormSection>

        {/* Section 9: Features Out */}
        <FormSection title="Poza zakresem (Out of Scope)" number="9" icon="featuresOut">
          <Textarea
            label="Co NIE wchodzi w zakres"
            placeholder="Lista funkcjonalności, które NIE zostaną zaimplementowane w tej wersji:&#10;• Funkcja A (przyszła iteracja)&#10;• Funkcja B (wymaga dalszej analizy)"
            value={prdData.featuresOut}
            onChange={(value) => handleChange('featuresOut', value)}
            rows={5}
          />
        </FormSection>

        {/* Section 10: Success Metrics */}
        <FormSection title="Metryki sukcesu" number="10" icon="metrics">
          <Textarea
            label="Jak zmierzymy sukces?"
            placeholder="Zdefiniuj mierzalne wskaźniki sukcesu:&#10;• KPI 1: np. Wzrost konwersji o 15%&#10;• KPI 2: np. NPS > 50&#10;• KPI 3: np. Czas realizacji < 2 dni"
            value={prdData.successMetrics}
            onChange={(value) => handleChange('successMetrics', value)}
            rows={5}
          />
        </FormSection>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <PDFGenerator prdData={prdData} disabled={isFormEmpty()} userEmail={userEmail} />
          <button
            type="button"
            onClick={handleClear}
            className="group/clear px-7 py-3.5 rounded-xl font-semibold border-2 border-gray-300 text-text-secondary bg-white hover:border-accent-red hover:text-accent-red hover:bg-accent-red/5 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 group-hover/clear:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Wyczyść formularz
          </button>
        </div>
      </form>
    </div>
  )
}

export default PRDForm
export { initialPrdData }
