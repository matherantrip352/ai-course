import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OTPForm from '../components/OTPForm'

export default function Verify() {
  const [email, setEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const e = localStorage.getItem('email')
    if (!e) navigate('/')
    setEmail(e)
  }, [navigate])

  if (!email) return null

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Verify OTP</h2>
      <p className="text-sm text-gray-600 mb-4">We sent an OTP to {email}. Enter it below.</p>
      <OTPForm email={email} onVerified={() => navigate('/profile')} />
    </div>
  )
}




