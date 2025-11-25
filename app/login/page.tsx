"use client"

import { useState } from "react"
import { supabase } from "@/lib/sap"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const router = useRouter()

  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()

    
    const { data: users, error: userErr } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .limit(1)

    
    if (userErr || users.length === 0) {
      setError("username tidak ada")
      return
    }

    const user = users[0]

    
    if (user.password !== password) {
      setError("password salah")
      return
    }
    localStorage.setItem("currentUser", user.username)

    router.push("/dashboard")
  }


  
  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl max-w w-screen h-screen items-center justify-center"
    >
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 bg-gray-700 text-gray-100 rounded"
    />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 bg-gray-700 text-gray-100 rounded"
      />

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-500 p-2 rounded text-white"
      >
        Login
      </button>


      <div className="text-gray-700"> belum punya akun? <a href="/signup" className="text-blue-700"> daftar </a></div>

    </form>
  )
}
