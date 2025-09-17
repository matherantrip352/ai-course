import { useState } from 'react'
import api from '../api'

const API = 'http://127.0.0.1:8080/api'

export default function EmailForm({ onSent }: { onSent: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await api.post(`/auth/request-otp`, { email })
      onSent(email)
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        type="email"
        required
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <button disabled={loading} className="w-full bg-blue-600 text-white rounded px-3 py-2">
        {loading ? 'Sending…' : 'Send OTP'}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  )
}



