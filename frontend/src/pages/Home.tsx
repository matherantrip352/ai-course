// import { useEffect, useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import api from '../api'

// export default function Home() {
//   const [modules, setModules] = useState<any[]>([])
//   const [selectedModule, setSelectedModule] = useState<any>(null)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const user = localStorage.getItem('email')

//   useEffect(() => {
//     if (user) {
//       setLoading(true)
//       api.get(`/modules`)
//         .then(r => setModules(r.data))
//         .catch(err => {
//           if (err.response?.status === 401) {
//             localStorage.clear()
//             navigate('/')
//           }
//         })
//         .finally(() => setLoading(false))
//     }else {
//       navigate('/'); // Redirect non-logged-in users to /
//     }
//   }, [user, navigate])

//   const handleModuleClick = async (moduleId: number) => {
//     if (moduleId === 4) {
//       navigate('/quiz')
//       return
//     }

//     try {
//       const response = await api.get(`/modules/${moduleId}`)
//       setSelectedModule(response.data)
//     } catch (err) {
//       console.error('Failed to load module:', err)
//     }
//   }

//   const courses = [
//     {
//       id: 1,
//       title: "AI Fundamentals for Financial Services",
//       description: "Master the basics of AI, ML, and DL in the context of financial services",
//       modules: 3,
//       duration: "2 hours",
//       level: "Beginner",
//       color: "from-blue-500 to-purple-600"
//     },
//     {
//       id: 2,
//       title: "Advanced AI Applications in Fintech",
//       description: "Explore cutting-edge AI applications in fraud detection, risk assessment, and customer service",
//       modules: 4,
//       duration: "3 hours",
//       level: "Advanced",
//       color: "from-green-500 to-teal-600"
//     },
//     {
//       id: 3,
//       title: "Regulatory Compliance & AI Ethics",
//       description: "Understanding regulatory requirements and ethical considerations in AI deployment",
//       modules: 2,
//       duration: "1.5 hours",
//       level: "Intermediate",
//       color: "from-orange-500 to-red-600"
//     }
//   ]

//   // if (!user) {
//   //   // Public home page for non-logged in users
//   //   return (
//   //     <div className="min-h-screen">
//   //       {/* Hero Section */}
//   //       <div 
//   //         className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"
//   //         style={{
//   //           backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop)',
//   //           backgroundSize: 'cover',
//   //           backgroundPosition: 'center',
//   //           backgroundBlendMode: 'overlay'
//   //         }}
//   //       >
//   //         <div className="absolute inset-0 bg-black/40"></div>
//   //         <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
//   //           <div className="text-center max-w-4xl mx-auto">
//   //             <div className="mb-8">
//   //               <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
//   //                 NPCI <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Learning</span> Platform
//   //               </h1>
//   //               <p className="text-xl md:text-2xl text-gray-200 mb-8">
//   //                 Master Artificial Intelligence for Financial Services
//   //               </p>
//   //               <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
//   //                 Join thousands of professionals transforming their careers with cutting-edge AI knowledge tailored for the financial sector.
//   //               </p>
//   //             </div>

//   //             {/* CTA Buttons
//   //             <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
//   //               <Link
//   //                 to="/login"
//   //                 className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
//   //               >
//   //                 Start Learning
//   //               </Link>
//   //               <button
//   //                 onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
//   //                 className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-200"
//   //               >
//   //                 Explore Courses
//   //               </button>
//   //             </div> */}
//   //           </div>
//   //         </div>
//   //       </div>

//   //       {/* Courses Section
//   //       <div id="courses" className="py-20 bg-white">
//   //         <div className="max-w-7xl mx-auto px-4">
//   //           <div className="text-center mb-16">
//   //             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Course Catalog</h2>
//   //             <p className="text-xl text-gray-600">Comprehensive learning paths for every skill level</p>
//   //           </div>
            
//   //           <div className="grid md:grid-cols-3 gap-8">
//   //             {courses.map((course) => (
//   //               <div key={course.id} className="group cursor-pointer">
//   //                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
//   //                   <div className={`h-48 bg-gradient-to-br ${course.color} p-6 flex items-end`}>
//   //                     <div className="text-white">
//   //                       <div className="text-sm font-medium opacity-90 mb-1">{course.level}</div>
//   //                       <h3 className="text-xl font-bold">{course.title}</h3>
//   //                     </div>
//   //                   </div>
//   //                   <div className="p-6">
//   //                     <p className="text-gray-600 mb-4">{course.description}</p>
//   //                     <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//   //                       <span>{course.modules} modules</span>
//   //                       <span>{course.duration}</span>
//   //                     </div>
//   //                     <Link
//   //                       to="/login"
//   //                       className="block w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
//   //                     >
//   //                       Start Learning
//   //                     </Link>
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             ))}
//   //           </div>
//   //         </div>
//   //       </div> */}

//   //       {/* Features Section */}
//   //       <div className="py-20 bg-gray-50">
//   //         <div className="max-w-7xl mx-auto px-4">
//   //           <div className="text-center mb-16">
//   //             <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
//   //             <p className="text-xl text-gray-600">Industry-leading AI education designed specifically for financial professionals</p>
//   //           </div>
            
//   //           <div className="grid md:grid-cols-3 gap-8">
//   //             <div className="text-center p-6">
//   //               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//   //                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//   //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//   //                 </svg>
//   //               </div>
//   //               <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert-Led Content</h3>
//   //               <p className="text-gray-600">Learn from industry experts with real-world experience in AI and financial services</p>
//   //             </div>
              
//   //             <div className="text-center p-6">
//   //               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//   //                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//   //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//   //                 </svg>
//   //               </div>
//   //               <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Certification</h3>
//   //               <p className="text-gray-600">Earn recognized certificates to advance your career in AI and fintech</p>
//   //             </div>
              
//   //             <div className="text-center p-6">
//   //               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//   //                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//   //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//   //                 </svg>
//   //               </div>
//   //               <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-On Learning</h3>
//   //               <p className="text-gray-600">Apply your knowledge with practical exercises and real-world case studies</p>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>

//   //       {/* Stats Section
//   //       <div className="py-20 bg-gray-900 text-white">
//   //         <div className="max-w-7xl mx-auto px-4">
//   //           <div className="grid md:grid-cols-4 gap-8 text-center">
//   //             <div>
//   //               <div className="text-4xl font-bold text-yellow-400 mb-2">10,000+</div>
//   //               <div className="text-gray-300">Students Enrolled</div>
//   //             </div>
//   //             <div>
//   //               <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
//   //               <div className="text-gray-300">Completion Rate</div>
//   //             </div>
//   //             <div>
//   //               <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
//   //               <div className="text-gray-300">Partner Organizations</div>
//   //             </div>
//   //             <div>
//   //               <div className="text-4xl font-bold text-yellow-400 mb-2">4.9/5</div>
//   //               <div className="text-gray-300">Average Rating</div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div> */}
//   //     </div>
//   //   )
//   // }

//   // Logged-in user's dashboard
//   return (
//     <div 
//       className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
//       style={{
//         backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundBlendMode: 'overlay'
//       }}
//     >
//       <div className="absolute inset-0 bg-white/80"></div>
//       <div className="relative z-10 px-4 py-8">
//         <div className="max-w-7xl mx-auto">
//           {!selectedModule ? (
//             <>
//               {/* Header */}
//               <div className="text-center mb-12">
//                 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//                   AI for Financial Services
//                 </h1>
//                 <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                   Complete learning path covering AI fundamentals, advanced applications, and regulatory compliance in financial technology
//                 </p>
//               </div>

//               {/* Progress Bar
//               <div className="mb-12">
//                 <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Course Progress</h3>
//                     <span className="text-sm text-gray-600">0% Complete</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '0%'}}></div>
//                   </div>
//                 </div>
//               </div> */}

//               {/* Modules Grid */}
//               {loading ? (
//                 <div className="flex items-center justify-center py-20">
//                   <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//                 </div>
//               ) : (
//                 <div className="grid gap-6">
//                   {modules.map((module, index) => (
//                     <div key={module.id} className="group">
//                       <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-white/20">
//                         <div className="p-8">
//                           <div className="flex items-start justify-between">
//                             <div className="flex-1">
//                               <div className="flex items-center mb-4">
//                                 <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${
//                                   module.id === 4 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
//                                 }`}>
//                                   {index + 1}
//                                 </div>
//                                 <div>
//                                   <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                                     {module.title}
//                                   </h3>
//                                   <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
//                                     <span className="flex items-center">
//                                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                       </svg>
//                                       {module.id === 4 ? '30 min' : '45 min'}
//                                     </span>
//                                     <span className="flex items-center">
//                                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                       </svg>
//                                       {module.id === 4 ? 'Quiz' : '3 parts'}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
                              
//                               <p className="text-gray-600 mb-6">
//                                 {module.id === 1 && "Master the fundamental concepts of AI, ML, and Deep Learning with practical examples from financial services."}
//                                 {module.id === 2 && "Explore advanced AI concepts including agents, MCP, and the trade-offs between RAG and fine-tuning."}
//                                 {module.id === 3 && "Deep dive into real-world AI applications in financial services including fraud detection, credit scoring, and compliance."}
//                                 {module.id === 4 && "Test your knowledge and earn your certification with a comprehensive quiz covering all course materials."}
//                               </p>
                              
//                               <button 
//                                 onClick={() => handleModuleClick(module.id)}
//                                 className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//                                   module.id === 4 
//                                     ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-green-500/25' 
//                                     : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25'
//                                 } hover:scale-105`}
//                               >
//                                 {module.id === 4 ? (
//                                   <>
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                                     </svg>
//                                     Start Certification Quiz
//                                   </>
//                                 ) : (
//                                   <>
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                     </svg>
//                                     Start Module
//                                   </>
//                                 )}
//                               </button>
//                             </div>
//                             <div className="ml-6">
//                               <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
//                                 {module.id === 1 && <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
//                                 {module.id === 2 && <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
//                                 {module.id === 3 && <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
//                                 {module.id === 4 && <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           ) : (
//             /* Module Content View */
//             <div className="max-w-4xl mx-auto">
//               <div className="mb-8">
//                 <button 
//                   onClick={() => setSelectedModule(null)}
//                   className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                   Back to Modules
//                 </button>
//               </div>

//               <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8">{selectedModule.title}</h1>
                
//                 <div className="space-y-8">
//                   {selectedModule.parts.map((part: any, index: number) => (
//                     <div key={index} className="border-l-4 border-blue-500 pl-6">
//                       <h2 className="text-xl font-semibold text-gray-900 mb-3">{part.title}</h2>
//                       <div className="prose prose-lg text-gray-700">
//                         <p className="whitespace-pre-line">{part.body}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-200">
//                   <div className="text-sm text-gray-500">
//                     Module {selectedModule.id} of 4 • Estimated time: 45 minutes
//                   </div>
//                   <button 
//                     onClick={() => setSelectedModule(null)}
//                     className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
//                   >
//                     Mark as Complete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


// Home.tsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [modules, setModules] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('email');

  useEffect(() => {
    if (user) {
      setLoading(true);
      api
        .get(`/modules`)
        .then((r) => setModules(r.data))
        .catch((err) => {
          if (err.response?.status === 401) {
            localStorage.clear();
            navigate('/');
          }
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/'); // Redirect non-logged-in users to /
    }
  }, [user, navigate]);

  const handleModuleClick = async (moduleId: number) => {
    if (moduleId === 4) {
      navigate('/quiz');
      return;
    }

    try {
      const response = await api.get(`/modules/${moduleId}`);
      setSelectedModule(response.data);
    } catch (err) {
      console.error('Failed to load module:', err);
    }
  };

  const courses = [
    {
      id: 1,
      title: 'AI Fundamentals for Financial Services',
      description: 'Master the basics of AI, ML, and DL in the context of financial services',
      modules: 3,
      duration: '2 hours',
      level: 'Beginner',
      color: 'from-blue-500 to-purple-600',
    },
    {
      id: 2,
      title: 'Advanced AI Applications in Fintech',
      description: 'Explore cutting-edge AI applications in fraud detection, risk assessment, and customer service',
      modules: 4,
      duration: '3 hours',
      level: 'Advanced',
      color: 'from-green-500 to-teal-600',
    },
    {
      id: 3,
      title: 'Regulatory Compliance & AI Ethics',
      description: 'Understanding regulatory requirements and ethical considerations in AI deployment',
      modules: 2,
      duration: '1.5 hours',
      level: 'Intermediate',
      color: 'from-orange-500 to-red-600',
    },
  ];

  // Logged-in user's dashboard
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      style={{
        backgroundImage:
          'ur[](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
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

              {/* Course Catalog */}
              <div className="py-20 bg-white/90 rounded-2xl shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Course Catalog</h2>
                    <p className="text-xl text-gray-600">Comprehensive learning paths for every skill level</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {courses.map((course) => (
                      <div key={course.id} className="group cursor-pointer">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                          <div className={`h-48 bg-gradient-to-br ${course.color} p-6 flex items-end`}>
                            <div className="text-white">
                              <div className="text-sm font-medium opacity-90 mb-1">{course.level}</div>
                              <h3 className="text-xl font-bold">{course.title}</h3>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <span>{course.modules} modules</span>
                              <span>{course.duration}</span>
                            </div>
                            <Link
                              to="/course" // Navigate to /course
                              className="block w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
                            >
                              Start Learning
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modules Grid (Optional, if you want to keep module selection here) */}
              {/* {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="grid gap-6 mt-12">
                  {modules.map((module, index) => (
                    <div key={module.id} className="group">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-white/20">
                        <div className="p-8">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-4">
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${
                                    module.id === 4
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                      : 'bg-gradient-to-r from-blue-500 to-purple-600'
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {module.title}
                                  </h3>
                                  <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                      <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      {module.id === 4 ? '30 min' : '45 min'}
                                    </span>
                                    <span className="flex items-center">
                                      <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                      {module.id === 4 ? 'Quiz' : '3 parts'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-6">
                                {module.id === 1 &&
                                  'Master the fundamental concepts of AI, ML, and Deep Learning with practical examples from financial services.'}
                                {module.id === 2 &&
                                  'Explore advanced AI concepts including agents, MCP, and the trade-offs between RAG and fine-tuning.'}
                                {module.id === 3 &&
                                  'Deep dive into real-world AI applications in financial services including fraud detection, credit scoring, and compliance.'}
                                {module.id === 4 &&
                                  'Test your knowledge and earn your certification with a comprehensive quiz covering all course materials.'}
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
                                    <svg
                                      className="w-5 h-5 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                      />
                                    </svg>
                                    Start Certification Quiz
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      className="w-5 h-5 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      />
                                    </svg>
                                    Start Module
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="ml-6">
                              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                                {module.id === 1 && (
                                  <svg
                                    className="w-12 h-12 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                  </svg>
                                )}
                                {module.id === 2 && (
                                  <svg
                                    className="w-12 h-12 text-purple-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                  </svg>
                                )}
                                {module.id === 3 && (
                                  <svg
                                    className="w-12 h-12 text-indigo-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                  </svg>
                                )}
                                {module.id === 4 && (
                                  <svg
                                    className="w-12 h-12 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
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
                        <p className="whitespace-pre-line">{part.body}</p>
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
  );
}