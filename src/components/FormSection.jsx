/**
 * FormSection - Reusable section wrapper component for PRD form sections
 */
import { useState } from 'react'

// Tooltip component
function Tooltip({ content }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block ml-2">
      <button
        type="button"
        className="w-5 h-5 rounded-full bg-gray-100  text-text-secondary  hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center text-xs font-medium cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        ?
      </button>
      {isVisible && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-secondary  text-white text-xs rounded-lg shadow-lg animate-fade-in">
          <div className="relative">
            {content}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-secondary " />
          </div>
        </div>
      )}
    </div>
  )
}

// Tooltip content for each section
const sectionTooltips = {
  header: 'Podaj podstawowe informacje o dokumencie: tytuł projektu, autora i zespół odpowiedzialny za realizację.',
  overview: 'Opisz w 2-3 zdaniach czym jest produkt/funkcjonalność i dlaczego jest ważny dla biznesu.',
  problem: 'Zdefiniuj problem, który rozwiązujesz. Użyj danych i konkretnych przykładów.',
  objectives: 'Cele powinny być SMART: Specyficzne, Mierzalne, Osiągalne, Realistyczne i Określone w czasie.',
  constraints: 'Wymień ograniczenia projektu: budżet, czas, zasoby, technologia, regulacje prawne.',
  personas: 'Opisz typowych użytkowników: kim są, jakie mają potrzeby i jak będą korzystać z produktu.',
  useCases: 'Opisz konkretne scenariusze użycia krok po kroku: co użytkownik robi i co system odpowiada.',
  featuresIn: 'Lista funkcji, które BĘDĄ zaimplementowane w tej wersji produktu.',
  featuresOut: 'Lista funkcji, które NIE BĘDĄ zaimplementowane - ważne dla zarządzania oczekiwaniami.',
  metrics: 'Zdefiniuj KPI: jak zmierzysz sukces projektu? Podaj konkretne liczby i cele.'
}

// Icon components for each section
const sectionIcons = {
  header: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  overview: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  problem: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  objectives: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  constraints: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  personas: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  useCases: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  featuresIn: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  featuresOut: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  metrics: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

// Color mapping for section icons
const iconColors = {
  header: 'bg-primary text-white',
  overview: 'bg-primary-light text-white',
  problem: 'bg-accent-red text-white',
  objectives: 'bg-accent-mint text-white',
  constraints: 'bg-accent-yellow text-secondary',
  personas: 'bg-accent-pink text-white',
  useCases: 'bg-primary text-white',
  featuresIn: 'bg-accent-mint text-white',
  featuresOut: 'bg-text-secondary text-white',
  metrics: 'bg-primary text-white'
}

function FormSection({ title, number, icon, children }) {
  const iconElement = icon ? sectionIcons[icon] : null
  const colorClass = icon ? iconColors[icon] : 'bg-primary text-white'
  const tooltipContent = icon ? sectionTooltips[icon] : null

  return (
    <section className="group/section mb-8 p-5 -mx-5 rounded-2xl hover:bg-gray-50/50 transition-all duration-300">
      <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-200 group-hover/section:border-gray-300 transition-colors">
        {number && (
          <span className={`flex items-center justify-center w-11 h-11 rounded-xl ${colorClass} text-sm font-semibold shadow-md group-hover/section:shadow-lg group-hover/section:scale-105 transition-all duration-300`}>
            {iconElement || number}
          </span>
        )}
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-secondary group-hover/section:text-primary transition-colors duration-300">
              {title}
            </h2>
            {tooltipContent && <Tooltip content={tooltipContent} />}
          </div>
          {number && (
            <span className="text-xs text-text-muted">Sekcja {number} z 10</span>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  )
}

export default FormSection
