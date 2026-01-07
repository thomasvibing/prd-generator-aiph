/**
 * LandingPage - Lead magnet landing page with MailerLite integration
 */
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logoSvg from '../assets/logo.svg'
import MultiStepForm from '../components/MultiStepForm'

function LandingPage() {
  const [showMultiStep, setShowMultiStep] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const formSectionRef = useRef(null)

  // Scroll to form section
  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Listen for MailerLite form submission via custom event
  useEffect(() => {
    const handleFormSuccess = (event) => {
      console.log('🎉 ml-form-success event received:', event.detail)
      const { email, name } = event.detail || {}
      if (email) setUserEmail(email)
      if (name) setUserName(name)
      setShowMultiStep(true)
    }

    window.addEventListener('ml-form-success', handleFormSuccess)

    // Define the MailerLite success function globally BEFORE loading the script
    // This prevents the default redirect behavior
    window.ml_webform_success_35455963 = function() {
      console.log('✅ MailerLite form submitted successfully')

      // Extract form values before hiding
      const form = document.querySelector('.ml-block-form')
      let email = ''
      let name = ''

      if (form) {
        const emailInput = form.querySelector('input[name="fields[email]"]')
        const nameInput = form.querySelector('input[name="fields[name]"]')
        if (emailInput) email = emailInput.value
        if (nameInput) name = nameInput.value
        console.log('Captured email:', email)
        console.log('Captured name:', name)
      }

      // Hide the MailerLite form container
      const formContainer = document.getElementById('mlb2-35455963')
      if (formContainer) {
        formContainer.style.display = 'none'
      }

      // Dispatch custom event to trigger React state update
      window.dispatchEvent(new CustomEvent('ml-form-success', {
        detail: { email, name }
      }))

      // Return false to prevent default redirect
      return false
    }

    // Load MailerLite script
    const script = document.createElement('script')
    script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024'
    script.async = true
    document.body.appendChild(script)

    // Takel script
    fetch("https://assets.mailerlite.com/jsonp/2023813/forms/175963325955310791/takel")

    return () => {
      window.removeEventListener('ml-form-success', handleFormSuccess)
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Also intercept form submission directly as a fallback
  useEffect(() => {
    const interceptFormSubmit = () => {
      const form = document.querySelector('.ml-block-form')
      if (form && !form.dataset.intercepted) {
        form.dataset.intercepted = 'true'
        form.addEventListener('submit', (e) => {
          console.log('📝 Form submit intercepted')

          // Capture values
          const emailInput = form.querySelector('input[name="fields[email]"]')
          const nameInput = form.querySelector('input[name="fields[name]"]')
          const email = emailInput?.value || ''
          const name = nameInput?.value || ''

          console.log('Form email:', email)
          console.log('Form name:', name)

          // Store values for later use
          if (email) {
            window._mlFormEmail = email
            window._mlFormName = name
          }

          // Set a timeout to show multistep if success callback doesn't fire
          setTimeout(() => {
            if (window._mlFormEmail && !showMultiStep) {
              console.log('⏰ Fallback: showing MultiStepForm after timeout')
              setUserEmail(window._mlFormEmail)
              setUserName(window._mlFormName || '')
              setShowMultiStep(true)
            }
          }, 3000)
        })
      }
    }

    // Try immediately and after a delay (for dynamic form loading)
    interceptFormSubmit()
    const timer = setTimeout(interceptFormSubmit, 1000)

    return () => clearTimeout(timer)
  }, [showMultiStep])

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Oszczędź czas',
      description: 'Gotowe szablony i struktura PRD'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Profesjonalny format',
      description: 'Export do PDF z brandingiem'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      ),
      title: 'Autosave',
      description: 'Nie stracisz swoich danych'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Darmowe',
      description: 'Bez ukrytych kosztów'
    }
  ]

  return (
    <div className="min-h-screen bg-bg-secondary bg-dot-pattern bg-gradient-brand relative overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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
        <div
          className="decorative-shape animate-float-reverse bg-accent-mint/20 w-40 h-40 blur-xl"
          style={{ top: '20%', right: '8%' }}
        />
        <div
          className="decorative-shape animate-float bg-accent-mint/15 w-28 h-28 blur-lg"
          style={{ top: '45%', left: '3%' }}
        />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-navbar sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a
              href="https://www.aiproductheroes.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src={logoSvg} alt="AI Product Heroes" className="h-7 w-auto" />
            </a>
            <button
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-btn hover:shadow-btn-hover transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Zapisz się
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-[1] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-accent-mint/10 text-accent-mint text-sm font-semibold px-4 py-1.5 rounded-full border border-accent-mint/20 mb-6">
              Darmowe narzędzie dla Product Managerów
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary mb-6 leading-tight">
              Stwórz profesjonalny
              <span className="block text-primary">PRD w 10 minut</span>
            </h1>

            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Darmowe narzędzie dla Product Managerów i założycieli startupów.
              Wypełnij formularz i wygeneruj gotowy dokument wymagań produktowych.
            </p>

            <button
              onClick={scrollToForm}
              className="group/btn bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-btn hover:shadow-btn-hover transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] cursor-pointer inline-flex items-center gap-3"
            >
              Zapisz się i zacznij
              <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Hero image/mockup placeholder */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 max-w-4xl mx-auto border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent-mint/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-text-secondary font-medium">Podgląd generatora PRD</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-mint/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-[1] py-16 md:py-24 bg-white/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Dlaczego PRD Generator?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Narzędzie stworzone z myślą o Product Managerach, którzy cenią swój czas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                  index === 0 ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' :
                  index === 1 ? 'bg-accent-mint/10 text-accent-mint group-hover:bg-accent-mint group-hover:text-white' :
                  index === 2 ? 'bg-accent-pink/10 text-accent-pink group-hover:bg-accent-pink group-hover:text-white' :
                  'bg-accent-yellow/10 text-accent-yellow group-hover:bg-accent-yellow group-hover:text-secondary'
                }`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formSectionRef} className="relative z-[1] py-16 md:py-24" id="signup-form">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Zapisz się i otrzymaj dostęp
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Dołącz do społeczności Product Managerów i zacznij tworzyć lepsze PRD
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {showMultiStep ? (
              <MultiStepForm
                email={userEmail}
                name={userName}
                onComplete={() => {
                  window.location.href = `/app?email=${encodeURIComponent(userEmail)}`
                }}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
                {/* MailerLite Embed Form */}
                <style dangerouslySetInnerHTML={{ __html: `
                  @import url("https://assets.mlcdn.com/fonts.css?version=1767787");

                  #mlb2-35455963.ml-form-embedContainer {
                    box-sizing: border-box;
                    display: table;
                    margin: 0 auto;
                    position: static;
                    width: 100% !important;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper {
                    background-color: transparent;
                    border-width: 0px;
                    border-radius: 4px;
                    border-style: solid;
                    box-sizing: border-box;
                    display: inline-block !important;
                    margin: 0;
                    padding: 0;
                    position: relative;
                    width: 100%;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper.embedForm {
                    max-width: 100%;
                    width: 100%;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody {
                    padding: 0;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent {
                    margin: 0;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group {
                    text-align: left !important;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group label {
                    margin-bottom: 8px;
                    color: #1a1a2e;
                    font-size: 14px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-weight: 500;
                    display: inline-block;
                    line-height: 20px;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow {
                    margin: 0 0 16px 0;
                    width: 100%;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
                    margin: 0 0 16px 0;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
                    background-color: #ffffff !important;
                    color: #1a1a2e !important;
                    border-color: #e5e7eb !important;
                    border-radius: 12px !important;
                    border-style: solid !important;
                    border-width: 1px !important;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 16px !important;
                    height: auto;
                    line-height: 24px !important;
                    margin: 0;
                    padding: 14px 16px !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                    transition: all 0.2s ease;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:focus {
                    border-color: #4d65ff !important;
                    box-shadow: 0 0 0 3px rgba(77, 101, 255, 0.1) !important;
                    outline: none !important;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::placeholder {
                    color: #adb5bd !important;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
                    margin: 8px 0 0 0;
                    float: left;
                    width: 100%;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
                    background-color: #4d65ff !important;
                    border: none !important;
                    border-radius: 12px !important;
                    box-shadow: 0 4px 6px -1px rgba(77, 101, 255, 0.25) !important;
                    color: #ffffff !important;
                    cursor: pointer;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                    font-size: 16px !important;
                    font-weight: 600 !important;
                    line-height: 24px !important;
                    height: auto;
                    padding: 14px 24px !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                    transition: all 0.2s ease !important;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
                    background-color: #3a4fcc !important;
                    box-shadow: 0 10px 15px -3px rgba(77, 101, 255, 0.3) !important;
                    transform: translateY(-2px);
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading {
                    display: none;
                  }

                  #mlb2-35455963.ml-form-embedContainer .ml-form-successBody {
                    display: none;
                  }

                  .ml-form-embedSubmitLoad {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                  }

                  .ml-form-embedSubmitLoad:after {
                    content: " ";
                    display: block;
                    width: 16px;
                    height: 16px;
                    margin: 2px;
                    border-radius: 50%;
                    border: 3px solid #fff;
                    border-color: #ffffff #ffffff #ffffff transparent;
                    animation: ml-form-embedSubmitLoad 1.2s linear infinite;
                  }

                  @keyframes ml-form-embedSubmitLoad {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }

                  .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0,0,0,0);
                    border: 0;
                  }
                `}} />

                <div id="mlb2-35455963" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-35455963">
                  <div className="ml-form-align-center">
                    <div className="ml-form-embedWrapper embedForm">
                      <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                        <div className="ml-form-embedContent" style={{ marginBottom: 0 }}></div>
                        <form
                          className="ml-block-form"
                          action="https://assets.mailerlite.com/jsonp/2023813/forms/175963325955310791/subscribe"
                          data-code=""
                          method="post"
                          target="_blank"
                        >
                          <div className="ml-form-formContent">
                            <div className="ml-form-fieldRow">
                              <div className="ml-field-group ml-field-name ml-validate-required">
                                <label htmlFor="ml-name">Twoje imię</label>
                                <input
                                  aria-label="name"
                                  aria-required="true"
                                  type="text"
                                  className="form-control"
                                  data-inputmask=""
                                  name="fields[name]"
                                  placeholder="np. Anna"
                                  autoComplete="given-name"
                                  id="ml-name"
                                />
                              </div>
                            </div>
                            <div className="ml-form-fieldRow ml-last-item">
                              <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                                <label htmlFor="ml-email">Adres email</label>
                                <input
                                  aria-label="email"
                                  aria-required="true"
                                  type="email"
                                  className="form-control"
                                  data-inputmask=""
                                  name="fields[email]"
                                  placeholder="twoj@email.com"
                                  autoComplete="email"
                                  id="ml-email"
                                />
                              </div>
                            </div>
                          </div>
                          <input type="hidden" name="ml-submit" value="1" />
                          <div className="ml-form-embedSubmit">
                            <button type="submit" className="primary">
                              Zapisz się i otrzymaj dostęp
                            </button>
                            <button disabled style={{ display: 'none' }} type="button" className="loading">
                              <div className="ml-form-embedSubmitLoad"></div>
                              <span className="sr-only">Loading...</span>
                            </button>
                          </div>
                          <input type="hidden" name="anticsrf" value="true" />
                        </form>
                      </div>
                      <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                        <div className="ml-form-successContent">
                          <h4>Dziękujemy!</h4>
                          <p>Zostałeś dodany do listy subskrybentów.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-muted text-center mt-4">
                  Zapisując się, zgadzasz się na otrzymywanie materiałów edukacyjnych od AI Product Heroes.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark text-text-inverse py-12 relative z-[1]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={logoSvg} alt="AI Product Heroes" className="h-8 w-auto brightness-0 invert" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm opacity-80 mb-1">
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
              <p className="text-xs opacity-60">
                Darmowe narzędzie do tworzenia dokumentów wymagań produktowych
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
