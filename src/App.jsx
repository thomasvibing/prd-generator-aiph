import PRDForm from './components/PRDForm'
import logoSvg from './assets/logo.svg'

function App() {
  return (
    <div className="min-h-screen bg-bg-secondary bg-dot-pattern bg-gradient-brand relative overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Primary blue shapes */}
        <div
          className="decorative-shape animate-float bg-primary/20 w-32 h-32 blur-xl"
          style={{ top: '10%', left: '5%' }}
        />
        <div
          className="decorative-shape animate-float-reverse bg-primary/15 w-48 h-48 blur-2xl"
          style={{ top: '60%', right: '3%' }}
        />
        <div
          className="decorative-shape animate-float-slow bg-primary/10 w-24 h-24 blur-lg"
          style={{ top: '80%', left: '10%' }}
        />

        {/* Mint accent shapes */}
        <div
          className="decorative-shape animate-float-reverse bg-accent-mint/20 w-40 h-40 blur-xl"
          style={{ top: '20%', right: '8%' }}
        />
        <div
          className="decorative-shape animate-float bg-accent-mint/15 w-28 h-28 blur-lg"
          style={{ top: '45%', left: '3%' }}
        />

        {/* Small geometric accents */}
        <div
          className="decorative-shape-square animate-float bg-primary/30 w-4 h-4"
          style={{ top: '15%', left: '20%' }}
        />
        <div
          className="decorative-shape-square animate-float-reverse bg-accent-mint/40 w-3 h-3"
          style={{ top: '35%', right: '15%' }}
        />
        <div
          className="decorative-shape-square animate-float-slow bg-primary/25 w-5 h-5 rotate-45"
          style={{ top: '70%', right: '20%' }}
        />
        <div
          className="decorative-shape-square animate-float bg-accent-mint/30 w-4 h-4"
          style={{ top: '85%', left: '25%' }}
        />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-navbar sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a
              href="https://www.aiproductheroes.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src={logoSvg} alt="AI Product Heroes" className="h-7 w-auto" />
            </a>
            <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
              PRD Generator
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-[1] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-primary via-primary to-primary-light rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Decorative elements inside hero */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-mint/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-accent-mint/20 text-accent-mint text-xs font-semibold px-3 py-1 rounded-full border border-accent-mint/30">
                  Darmowe narzędzie
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                Stwórz profesjonalny
                <span className="block text-accent-mint">PRD w minuty</span>
              </h1>

              <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-6">
                Wypełnij formularz i wygeneruj gotowy dokument wymagań produktowych.
                Twoje dane są automatycznie zapisywane.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-accent-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>10 sekcji PRD</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-accent-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Export do PDF</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-accent-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Autozapis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 pb-8 relative z-[1]">

        {/* PRD Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-card border border-white/50">
          <PRDForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-bg-dark text-text-inverse py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            PRD Generator by{' '}
            <a
              href="https://www.aiproductheroes.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-mint hover:underline"
            >
              AI Product Heroes
            </a>
          </p>
          <p className="text-xs opacity-60 mt-2">
            Narzędzie do tworzenia dokumentów wymagań produktowych
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
