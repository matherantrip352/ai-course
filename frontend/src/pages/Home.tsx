// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import EmailForm from '../components/EmailForm'

// export default function Home() {
//   const [sentEmail, setSentEmail] = useState<string | null>(null)
//   const navigate = useNavigate()

//   return (
//     <div className="min-h-[70vh] grid place-items-center" style={{
//       backgroundImage: 'url(https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop)',
//       backgroundSize: 'cover', backgroundPosition: 'center'
//     }}>
//       <div className="bg-white/90 backdrop-blur rounded-xl p-6 w-full max-w-md shadow">
//         <h1 className="text-2xl font-semibold mb-2 text-center">AI Mini Course</h1>
//         <p className="text-sm text-gray-600 mb-4 text-center">Enter your registered email to receive an OTP</p>
//         <EmailForm onSent={(email) => { localStorage.setItem('email', email); setSentEmail(email); navigate('/verify') }} />
//       </div>
//     </div>
//   )
// }




import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailForm from '../components/EmailForm'

export default function Home() {
  const [sentEmail, setSentEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  const courses = [
    {
      id: 1,
      title: "AI Fundamentals for Financial Services",
      description: "Master the basics of AI, ML, and DL in the context of financial services",
      modules: 3,
      duration: "2 hours",
      level: "Beginner",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Advanced AI Applications in Fintech",
      description: "Explore cutting-edge AI applications in fraud detection, risk assessment, and customer service",
      modules: 4,
      duration: "3 hours",
      level: "Advanced",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Regulatory Compliance & AI Ethics",
      description: "Understanding regulatory requirements and ethical considerations in AI deployment",
      modules: 2,
      duration: "1.5 hours",
      level: "Intermediate",
      color: "from-orange-500 to-red-600"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                NPCI <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Learning</span> Platform
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Master Artificial Intelligence for Financial Services
              </p>
              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                Join thousands of professionals transforming their careers with cutting-edge AI knowledge tailored for the financial sector.
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">Get Started Today</h2>
              <EmailForm onSent={(email) => { localStorage.setItem('email', email); setSentEmail(email); navigate('/verify') }} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Industry-leading AI education designed specifically for financial professionals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert-Led Content</h3>
              <p className="text-gray-600">Learn from industry experts with real-world experience in AI and financial services</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Certification</h3>
              <p className="text-gray-600">Earn recognized certificates to advance your career in AI and fintech</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-On Learning</h3>
              <p className="text-gray-600">Apply your knowledge with practical exercises and real-world case studies</p>
            </div>
          </div>
        </div>
      </div> */}
      
      {/* Courses Section
      <div className="py-20 bg-white">
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
                    <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
     

      {/* Stats Section
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">10,000+</div>
              <div className="text-gray-300">Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-gray-300">Completion Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Partner Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">4.9/5</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}