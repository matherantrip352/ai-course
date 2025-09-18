// import { Outlet, Link, useLocation } from 'react-router-dom'

// export default function App() {
//   const location = useLocation()
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
//         <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
//           <Link to="/" className="font-semibold">AI Mini Course</Link>
//           <nav className="text-sm space-x-4">
//             <Link className={linkClass(location.pathname === '/')} to="/">Home</Link>
//             <Link className={linkClass(location.pathname.startsWith('/course'))} to="/course">Course</Link>
//             <Link className={linkClass(location.pathname.startsWith('/quiz'))} to="/quiz">Quiz</Link>
//           </nav>
//         </div>
//       </header>
//       <main className="max-w-5xl mx-auto px-4 py-8">
//         <Outlet />
//       </main>
//     </div>
//   )
// }

// function linkClass(active: boolean) {
//   return `px-2 py-1 rounded ${active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
// }



import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    
    if (!token || !email) {
      navigate('/')
      return
    }
    
    setIsChecking(false)
  }, [navigate])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<{email: string, fullName?: string} | null>(null)

  useEffect(() => {
    const email = localStorage.getItem('email')
    const fullName = localStorage.getItem('full_name')
    if (email) {
      setUser({ email, fullName: fullName || undefined })
      // Redirect logged-in users from / or /login to /home
      if (location.pathname === '/' || location.pathname === '/login') {
        // navigate('/Home');
        navigate('/profile')
      }

    }
    else if (location.pathname !== '/' && location.pathname !== '/login') {
      // Redirect non-logged-in users to / if trying to access protected routes
      navigate('/');
    }
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    navigate('/')
  }

  const isPublicRoute = location.pathname === '/' || location.pathname === '/login'

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to={user ? '/home' : '/'} // Logo links to /home for logged-in users, / for others
           className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-xl text-gray-900">NPCI Learning</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {!isPublicRoute && (
              <>
                <Link 
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    location.pathname.startsWith('/course') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`} 
                  to="/course"
                >
                  Course
                </Link>
                {/* <Link 
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    location.pathname.startsWith('/quiz') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`} 
                  to="/quiz"
                >
                  Quiz
                </Link> */}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user.fullName || 'User'}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {(user.fullName || user.email).charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                to="/"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {isPublicRoute ? (
          <Outlet />
        ) : (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="font-bold text-xl">NPCI Learning Platform</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering financial professionals with cutting-edge AI education and certification programs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/course" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="/quiz" className="hover:text-white transition-colors">Certification</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div> */}
            
            {/* <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@npci-learning.com</li>
                <li>+91 98765 43210</li>
                <li>Mumbai, India</li>
              </ul>
            </div> */}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NPCI Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function linkClass(active: boolean) {
  return `px-2 py-1 rounded ${active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
}