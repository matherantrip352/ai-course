import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/tailwind.css'
import App from './App'
import Home from './pages/Home'
import Verify from './pages/Verify'
import Profile from './pages/Profile'
import Course from './pages/Course'
import Quiz from './pages/Quiz'
import Result from './pages/Result'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'verify', element: <Verify /> },
      { path: 'profile', element: <Profile /> },
      { path: 'course', element: <Course /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'result', element: <Result /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)



