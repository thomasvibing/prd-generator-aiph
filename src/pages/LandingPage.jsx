/**
 * LandingPage - Modern one-pager with split-screen layout
 */
import { useState, useEffect } from 'react'
import logoSvg from '../assets/logo.svg'
import MultiStepForm from '../components/MultiStepForm'

function LandingPage() {
  const [showMultiStep, setShowMultiStep] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

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
    window.ml_webform_success_35455963 = function() {
      console.log('✅ MailerLite form submitted successfully')

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

      const formContainer = document.getElementById('mlb2-35455963')
      if (formContainer) {
        formContainer.style.display = 'none'
      }

      window.dispatchEvent(new CustomEvent('ml-form-success', {
        detail: { email, name }
      }))

      return false
    }

    // Load MailerLite script
    const script = document.createElement('script')
    script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024'
    script.async = true
    document.body.appendChild(script)

    fetch("https://assets.mailerlite.com/jsonp/2023813/forms/175963325955310791/takel")

    return () => {
      window.removeEventListener('ml-form-success', handleFormSuccess)
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Fallback: intercept form submission directly
  useEffect(() => {
    const interceptFormSubmit = () => {
      const form = document.querySelector('.ml-block-form')
      if (form && !form.dataset.intercepted) {
        form.dataset.intercepted = 'true'
        form.addEventListener('submit', () => {
          console.log('📝 Form submit intercepted')

          const emailInput = form.querySelector('input[name="fields[email]"]')
          const nameInput = form.querySelector('input[name="fields[name]"]')
          const email = emailInput?.value || ''
          const name = nameInput?.value || ''

          if (email) {
            window._mlFormEmail = email
            window._mlFormName = name
          }

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

    interceptFormSubmit()
    const timer = setTimeout(interceptFormSubmit, 1000)

    return () => clearTimeout(timer)
  }, [showMultiStep])

  const benefits = [
    { icon: '⚡', title: 'Oszczędź czas', desc: 'Gotowe szablony i struktura' },
    { icon: '📄', title: 'Profesjonalny PDF', desc: 'Export z brandingiem' },
    { icon: '💾', title: 'Autozapis', desc: 'Nie stracisz danych' },
    { icon: '🎯', title: '100% darmowe', desc: 'Bez ukrytych kosztów' },
  ]

  return (
    <div className="min-h-screen bg-bg-secondary relative overflow-hidden flex items-center">
      {/* Subtle decorative background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="decorative-shape animate-float bg-primary/10 w-64 h-64 blur-3xl"
          style={{ top: '10%', left: '-5%' }}
        />
        <div
          className="decorative-shape animate-float-reverse bg-accent-mint/10 w-48 h-48 blur-2xl"
          style={{ bottom: '10%', right: '-5%' }}
        />
        <div
          className="decorative-shape animate-float-slow bg-primary/5 w-32 h-32 blur-xl"
          style={{ top: '50%', right: '30%' }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* LEFT SIDE: Hero content */}
          <div className="space-y-8">
            {/* Logo */}
            <a
              href="https://www.aiproductheroes.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img src={logoSvg} alt="AI Product Heroes" className="h-8 w-auto" />
            </a>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-secondary leading-tight">
                Stwórz profesjonalny
                <span className="text-primary block">PRD w 10 minut</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-md">
                Darmowe narzędzie dla Product Managerów i założycieli startupów
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/80 hover:bg-white/80 transition-colors"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <div>
                    <div className="font-semibold text-secondary text-sm">{benefit.title}</div>
                    <div className="text-text-muted text-xs">{benefit.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer branding */}
            <p className="text-xs text-text-muted">
              By{' '}
              <a
                href="https://www.aiproductheroes.pl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                AI Product Heroes
              </a>
            </p>
          </div>

          {/* RIGHT SIDE: Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {showMultiStep ? (
                <MultiStepForm
                  email={userEmail}
                  name={userName}
                  onComplete={() => {
                    window.location.href = `/app?email=${encodeURIComponent(userEmail)}`
                  }}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-secondary mb-2">
                      Zapisz się i zacznij
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Dołącz do społeczności Product Managerów
                    </p>
                  </div>

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
                                Rozpocznij za darmo
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
                    Zapisując się, zgadzasz się na otrzymywanie materiałów edukacyjnych.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
