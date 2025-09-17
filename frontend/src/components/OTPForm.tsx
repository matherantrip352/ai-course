import { useState } from 'react'
import api from '../api'

const API = 'http://127.0.0.1:8080/api'

export default function OTPForm({ email, onVerified }: { email: string, onVerified: () => void }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const r = await api.post(`/auth/verify-otp`, { email, code })
      if (r.data?.token) localStorage.setItem('token', r.data.token)
      onVerified()
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]{6}"
        required
        placeholder="Enter 6-digit OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <button disabled={loading} className="w-full bg-green-600 text-white rounded px-3 py-2">
        {loading ? 'Verifying…' : 'Verify OTP'}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  )
}



