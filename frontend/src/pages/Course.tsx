



import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const API = 'http://127.0.0.1:8080/api'

export default function Course() {
  const [modules, setModules] = useState<any[]>([])
  const [selectedModule, setSelectedModule] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
      return
    }

    api.get(`/modules`)
      .then(r => setModules(r.data))
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.clear()
          navigate('/')
        }
      })
      .finally(() => setLoading(false))
  }, [navigate])

  const handleModuleClick = async (moduleId: number) => {
    if (moduleId === 4) {
      navigate('/quiz')
      return
    }

    try {
      const response = await api.get(`/modules/${moduleId}`)
      setSelectedModule(response.data)
    } catch (err) {
      console.error('Failed to load module:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="relative z-10 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {!selectedModule ? (
            <>
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  AI for Financial Services
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Complete learning path covering AI fundamentals, advanced applications, and regulatory compliance in financial technology
                </p>
              </div>

              {/* Progress Bar
              <div className="mb-12">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Course Progress</h3>
                    <span className="text-sm text-gray-600">0% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
              </div> */}

              {/* Modules Grid */}
              <div className="grid gap-6">
                {modules.map((module, index) => (
                  <div key={module.id} className="group">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-white/20">
                      <div className="p-8">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${
                                module.id === 4 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {module.title}
                                </h3>
                                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {module.id === 4 ? '30 min' : '45 min'}
                                  </span>
                                  <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {module.id === 4 ? 'Quiz' : '3 parts'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-6">
                              {module.id === 1 && "Master the fundamental concepts of AI, ML, and Deep Learning with practical examples from financial services."}
                              {module.id === 2 && "Explore advanced AI concepts including agents, MCP, and the trade-offs between RAG and fine-tuning."}
                              {module.id === 3 && "Deep dive into real-world AI applications in financial services including fraud detection, credit scoring, and compliance."}
                              {module.id === 4 && "Test your knowledge and earn your certification with a comprehensive quiz covering all course materials."}
                            </p>
                            
                            <button 
                              onClick={() => handleModuleClick(module.id)}
                              className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                module.id === 4 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-green-500/25' 
                                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25'
                              } hover:scale-105`}
                            >
                              {module.id === 4 ? (
                                <>
                                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                  </svg>
                                  Start Certification Quiz
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Start Module
                                </>
                              )}
                            </button>
                          </div>
                          <div className="ml-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                              {module.id === 1 && <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                              {module.id === 2 && <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                              {module.id === 3 && <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                              {module.id === 4 && <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Module Content View */
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Modules
                </button>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">{selectedModule.title}</h1>
                
                <div className="space-y-8">
                  {selectedModule.parts.map((part: any, index: number) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">{part.title}</h2>
                      <div className="prose prose-lg text-gray-700">
                        <p>{part.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Module {selectedModule.id} of 4 • Estimated time: 45 minutes
                  </div>
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Mark as Complete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}