import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/tailwind.css'
import App from './App'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Course from './pages/Course'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Login from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Root route shows Login page
  },
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'Home', element: <Home /> },
      // { path: 'login', element: <Login /> },
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



