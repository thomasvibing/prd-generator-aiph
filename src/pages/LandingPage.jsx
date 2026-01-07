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
    { icon: '⚡', title: 'Oszczędź czas', desc: 'Gotowe szablony i struktura', color: 'from-amber-400 to-orange-500' },
    { icon: '📄', title: 'Profesjonalny PDF', desc: 'Export z brandingiem', color: 'from-blue-400 to-indigo-500' },
    { icon: '💾', title: 'Autozapis', desc: 'Nie stracisz danych', color: 'from-emerald-400 to-teal-500' },
    { icon: '🎯', title: '100% darmowe', desc: 'Bez ukrytych kosztów', color: 'from-pink-400 to-rose-500' },
  ]

  return (
    <div className="h-screen max-h-screen relative overflow-hidden flex items-center" style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 50%, #e8f5f0 100%)' }}>
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            top: '5%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(77, 101, 255, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            bottom: '0%',
            right: '-15%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0, 217, 165, 0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animationDelay: '1s'
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: '40%',
            right: '20%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(77, 101, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#4d65ff 1px, transparent 1px), linear-gradient(90deg, #4d65ff 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-3 h-3 bg-primary/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 right-40 w-2 h-2 bg-accent-mint/40 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-32 w-4 h-4 bg-primary/20 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent-mint/30 rounded-full animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }} />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-6 py-4 relative z-10 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center max-w-6xl mx-auto w-full">

          {/* LEFT SIDE: Hero content */}
          <div className="space-y-5">
            {/* Logo with subtle glow */}
            <a
              href="https://www.aiproductheroes.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:scale-105 transition-transform duration-300"
            >
              <img src={logoSvg} alt="AI Product Heroes" className="h-8 w-auto drop-shadow-sm" />
            </a>

            {/* Headline with gradient */}
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight">
                <span className="text-secondary">Stwórz profesjonalny</span>
                <span className="block bg-gradient-to-r from-primary via-primary-light to-accent-mint bg-clip-text text-transparent">
                  PRD w 10 minut
                </span>
              </h1>
              <p className="text-base lg:text-lg text-text-secondary max-w-md">
                Darmowe narzędzie dla Product Managerów i założycieli startupów
              </p>
            </div>

            {/* Benefits with colored icons */}
            <div className="grid grid-cols-2 gap-2">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 p-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-white shadow-sm hover:shadow-md hover:bg-white hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <span className="text-base">{benefit.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-secondary text-xs">{benefit.title}</div>
                    <div className="text-text-muted text-[10px]">{benefit.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer branding */}
            <p className="text-xs text-text-secondary">
              By{' '}
              <a
                href="https://www.aiproductheroes.pl/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                AI Product Heroes
              </a>
            </p>
          </div>

          {/* RIGHT SIDE: Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent-mint/20 to-primary/20 rounded-3xl blur-xl opacity-70" />
              {showMultiStep ? (
                <div className="relative">
                  <MultiStepForm
                    email={userEmail}
                    name={userName}
                    onComplete={() => {
                      window.location.href = `/app?email=${encodeURIComponent(userEmail)}`
                    }}
                  />
                </div>
              ) : (
                <div className="relative bg-white rounded-2xl shadow-2xl p-5 lg:p-6 border border-white/50 backdrop-blur-sm">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent-mint/5 to-transparent rounded-bl-2xl" />

                  <div className="relative text-center mb-3">
                    <h2 className="text-lg font-bold text-secondary mb-0.5">
                      Zapisz się i zacznij
                    </h2>
                    <p className="text-xs text-text-secondary">
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
                      margin: 0 0 12px 0;
                      width: 100%;
                    }

                    #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
                      margin: 0 0 12px 0;
                    }

                    #mlb2-35455963.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
                      background-color: #ffffff !important;
                      color: #1a1a2e !important;
                      border-color: #e5e7eb !important;
                      border-radius: 10px !important;
                      border-style: solid !important;
                      border-width: 1px !important;
                      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      font-size: 14px !important;
                      height: auto;
                      line-height: 20px !important;
                      margin: 0;
                      padding: 10px 14px !important;
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
                      border-radius: 10px !important;
                      box-shadow: 0 4px 6px -1px rgba(77, 101, 255, 0.25) !important;
                      color: #ffffff !important;
                      cursor: pointer;
                      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                      font-size: 14px !important;
                      font-weight: 600 !important;
                      line-height: 20px !important;
                      height: auto;
                      padding: 12px 20px !important;
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

                  <div className="relative mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-text-muted">
                      <svg className="w-3 h-3 text-accent-mint" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Twoje dane są bezpieczne. Bez spamu.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}

export default LandingPage
