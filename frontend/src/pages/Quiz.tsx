// import { useEffect, useState } from 'react'
// import api from '../api'
// import { useNavigate } from 'react-router-dom'

// const API = 'http://127.0.0.1:8080/api'

// type Q = { id: number, text: string, options: string[] }

// export default function Quiz() {
//   const [qs, setQs] = useState<Q[]>([])
//   const [answers, setAnswers] = useState<Record<number, number>>({})
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()
//   const email = localStorage.getItem('email')

//   useEffect(() => {
//     if (!email) { navigate('/'); return }
//     api.post(`/quiz/start`, { email }).then(r => setQs(r.data)).finally(() => setLoading(false))
//   }, [email, navigate])

//   const submit = async () => {
//     const payload = {
//       email,
//       answers: Object.entries(answers).map(([qid, idx]) => ({ question_id: Number(qid), selected_index: idx }))
//     }
//     const r = await api.post(`/quiz/submit`, payload)
//     localStorage.setItem('last_result', JSON.stringify(r.data))
//     navigate('/result')
//   }

//   if (loading) return <p>Loading…</p>

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Certification Quiz</h2>
//       <div className="space-y-6">
//         {qs.map((q, idx) => (
//           <div key={q.id} className="bg-white border rounded p-4">
//             <div className="font-medium mb-2">Q{idx + 1}. {q.text}</div>
//             <div className="grid gap-2">
//               {q.options.map((opt, i) => (
//                 <label key={i} className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name={`q_${q.id}`}
//                     checked={answers[q.id] === i}
//                     onChange={() => setAnswers({ ...answers, [q.id]: i })}
//                   />
//                   <span>{opt}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <button onClick={submit} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
//     </div>
//   )
// }



import { useEffect, useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

type Q = { id: number, text: string, options: string[] }

export default function Quiz() {
  const [qs, setQs] = useState<Q[]>([])
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const navigate = useNavigate()
  const email = localStorage.getItem('email')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || !email) { 
      navigate('/'); 
      return 
    }
    
    api.post(`/quiz/start`, { email })
      .then(r => setQs(r.data))
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.clear()
          navigate('/')
        }
      })
      .finally(() => setLoading(false))
  }, [email, navigate])

  const submit = async () => {
    if (Object.keys(answers).length !== qs.length) {
      alert('Please answer all questions before submitting.')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        email,
        answers: Object.entries(answers).map(([qid, idx]) => ({ 
          question_id: Number(qid), 
          selected_index: idx 
        }))
      }
      const r = await api.post(`/quiz/submit`, payload)
      localStorage.setItem('last_result', JSON.stringify(r.data))
      navigate('/result')
    } catch (err) {
      console.error('Quiz submission failed:', err)
      alert('Failed to submit quiz. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < qs.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Preparing your certification quiz...</p>
        </div>
      </div>
    )
  }

  const progress = ((Object.keys(answers).length) / qs.length) * 100

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Certification Quiz</h1>
            <p className="text-xl text-gray-300">Test your AI knowledge and earn your certificate</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Progress</span>
                <span className="text-white font-medium">{Object.keys(answers).length}/{qs.length} answered</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{width: `${progress}%`}}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {qs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${
                    answers[qs[idx]?.id] !== undefined
                      ? 'bg-green-500 text-white shadow-lg'
                      : currentQuestion === idx
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Question */}
          {qs.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Question {currentQuestion + 1} of {qs.length}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{qs[currentQuestion].text}</h2>
              </div>
              
              <div className="space-y-4">
                {qs[currentQuestion].options.map((opt, i) => (
                  <label 
                    key={i} 
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      answers[qs[currentQuestion].id] === i
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q_${qs[currentQuestion].id}`}
                      checked={answers[qs[currentQuestion].id] === i}
                      onChange={() => setAnswers({ ...answers, [qs[currentQuestion].id]: i })}
                      className="w-5 h-5 text-blue-600 mr-4"
                    />
                    <span className="text-lg text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-xl bg-white/20 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
            >
              Previous
            </button>
            
            <div className="flex space-x-4">
              {currentQuestion < qs.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <button 
                  onClick={submit}
                  disabled={submitting || Object.keys(answers).length !== qs.length}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit Quiz'}
                </button>
              )}
            </div>
          </div>

          {/* Quiz Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">80%</div>
                <div className="text-sm opacity-75">Passing Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm opacity-75">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">30</div>
                <div className="text-sm opacity-75">Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}