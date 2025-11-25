"use client"
import { addUser, getUsers } from "@/lib/account"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { BackButton } from "./back"


export function SignupForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    const users = getUsers()
    if (users.some(u => u.username === username)) {
      setError("Username sudah ada!")
      setSuccess("")
      return
    }
    addUser({ username, password })
    setSuccess("Akun berhasil dibuat! Mengarahkan ke login...")

    // redirect after a short delay so user sees message
    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        className="p-2 rounded bg-gray-700 text-gray-100"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 rounded bg-gray-700 text-gray-100"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <Button type="submit" className="bg-purple-600 hover:bg-purple-500">
        Sign Up
      </Button>
      <BackButton></BackButton>
    </form>
  )
}
