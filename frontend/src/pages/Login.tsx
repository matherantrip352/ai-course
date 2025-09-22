import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [otpSent, setOtpSent] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const navigate = useNavigate()

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await api.post(`/auth/request-otp`, { email })
      localStorage.setItem('email', email)
      setOtpSent(true)
      startResendCooldown()
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'you are not registered yet, kindly register first')
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setOtpError(null)
    setOtpLoading(true)
    try {
      const r = await api.post(`/auth/verify-otp`, { email, code: otpCode })
      if (r.data?.token) {
        localStorage.setItem('token', r.data.token)
        // navigate('/Home')
        navigate('/profile')
      }
    } catch (err: any) {
      setOtpError(err?.response?.data?.detail || 'Invalid OTP')
    } finally {
      setOtpLoading(false)
    }
  }

  const resendOTP = async () => {
    if (resendCooldown > 0) return
    
    setOtpError(null)
    setLoading(true)
    try {
      await api.post(`/auth/request-otp`, { email })
      startResendCooldown()
      setOtpError('New OTP sent successfully!')
      setTimeout(() => setOtpError(null), 3000)
    } catch (err: any) {
      setOtpError(err?.response?.data?.detail || 'Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  const startResendCooldown = () => {
    setResendCooldown(60)
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetForm = () => {
    setOtpSent(false)
    setOtpCode('')
    setEmail('')
    setError(null)
    setOtpError(null)
    setResendCooldown(0)
    localStorage.removeItem('email')
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="lanes relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              {/* Logo Row */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {/* NPCI Logo */}
                <img
                  src="/logos/NPCI-Logo.png"
                  alt="NPCI Logo"
                  className="w-45 h-24 object-contain"
                />

                {/* Handshake Symbol */}
                {/* <img
                  src="/logos/handshake.png"
                  alt="Handshake"
                  className="w-10 h-10 object-contain"
                /> */}

                {/* OpenAI Logo */}
                {/* <img
                  src="/logos/openai.png"
                  alt="OpenAI Logo"
                  className="w-40 h-24 object-contain"
                /> */}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to access your AI learning journey</p>
            </div>

            {!otpSent ? (
              /* Email Form */
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Enter Your registered Email</h2>
                <form onSubmit={sendOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registered Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <button 
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-4 py-3 font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Verification Code'}
                  </button>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.27 15.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {error}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              /* OTP Form */
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Check Your Email</h2>
                  <p className="text-gray-600 text-sm mb-2">We sent a 6-digit code to</p>
                  <p className="text-blue-600 font-semibold">{email}</p>
                </div>

                <form onSubmit={verifyOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      required
                      placeholder="Enter 6-digit code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-colors text-center text-lg font-mono tracking-widest"
                      maxLength={6}
                    />
                  </div>
                  <button 
                    disabled={otpLoading} 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl px-4 py-3 font-bold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                  >
                    {otpLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : 'Verify & Sign In'}
                  </button>
                </form>

                {/* Resend OTP Button */}
                <div className="mt-6 text-center space-y-3">
                  <button
                    onClick={resendOTP}
                    disabled={resendCooldown > 0 || loading}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                  </button>
                  
                  <button
                    onClick={resetForm}
                    className="block w-full text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
                  >
                    ← Use Different Email
                  </button>
                </div>

                {otpError && (
                  <div className={`mt-4 rounded-xl p-3 ${
                    otpError.includes('successfully') 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                          otpError.includes('successfully') 
                            ? "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.27 15.5c-.77.833.192 2.5 1.732 2.5z"
                        } />
                      </svg>
                      {otpError}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}