import { useState } from 'react'

export default function Result() {
  const result = JSON.parse(localStorage.getItem('last_result') || '{}')
  const email = localStorage.getItem('email')
  const fullName = localStorage.getItem('full_name')
  const passed = !!result.passed
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  const shareText = `🎉 I just earned my AI for Financial Services certification from NPCI Learning Platform! Scored ${result.percentage}% on the certification quiz. #AILearning #Fintech #NPCI`
  const shareUrl = window.location.origin

  const shareToSocial = (platform: string) => {
    let url = ''
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
        break
      // case 'facebook':
      //   url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
        // break
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
        break
    }
    window.open(url, '_blank')
    setShareMenuOpen(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
    alert('Copied to clipboard!')
    setShareMenuOpen(false)
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800"
      style={{
        backgroundImage: 'url(https://unsplash.com/photos/love-to-learn-pencil-signage-on-wall-near-walking-man-WE_Kv_ZB1l0&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            
            {/* Success/Failure Icon */}
            <div className="mb-8">
              {passed ? (
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              ) : (
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Results Header */}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {passed 
                ? `${fullName || 'You'} successfully completed the AI certification quiz!` 
                : 'You\'re on the right track. Review the materials and try again.'
              }
            </p>

            {/* Score Display */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {result.correct_answers}/{result.total_questions}
                  </div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div>
                  <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {result.percentage}%
                  </div>
                  <div className="text-gray-600">Score</div>
                </div>
                <div>
                  <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-gray-400'}`}>
                    {passed ? '✓' : '✗'}
                  </div>
                  <div className="text-gray-600">{passed ? 'Passed' : 'Not Passed'}</div>
                </div>
              </div>
            </div>

            {/* Status Message */}
            {passed ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-6 mb-8">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="font-semibold">Excellent work! You've earned your AI certification.</span>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 mb-8">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.27 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-semibold">You need 80% or higher to pass.</span>
                </div>
                <p className="text-sm">Review the course materials and reattempt the quiz when you're ready.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {passed ? (
                <>
                  {/* Certificate Download */}
                  <a
                    href={`http://127.0.0.1:8080/api/certificate`}
                    target="_blank"
                    onClick={(e) => {
                      e.preventDefault()
                      // Use api instance to include auth headers
                      const token = localStorage.getItem('token')
                      if (token) {
                        window.open(`http://127.0.0.1:8080/api/certificate?token=${token}`, '_blank')
                      }
                    }}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Certificate
                  </a>

                  {/* Share Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShareMenuOpen(!shareMenuOpen)}
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105"
                    >
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share Your Achievement
                    </button>

                    {/* Share Menu */}
                    {shareMenuOpen && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-10">
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => shareToSocial('twitter')}
                            className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            Twitter
                          </button>
                          
                          <button
                            onClick={() => shareToSocial('linkedin')}
                            className="flex items-center justify-center p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors"
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </button>
                          
                          {/* <button
                            onClick={() => shareToSocial('facebook')}
                            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                          </button> */}
                          
                          <button
                            onClick={() => shareToSocial('whatsapp')}
                            className="flex items-center justify-center p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            WhatsApp
                          </button>
                        </div>
                        <button
                          onClick={copyToClipboard}
                          className="w-full mt-3 p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <a 
                  href="/quiz" 
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reattempt Quiz
                </a>
              )}

              {/* Back to Course */}
              <a 
                href="/course" 
                className="inline-flex items-center justify-center w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Course
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}