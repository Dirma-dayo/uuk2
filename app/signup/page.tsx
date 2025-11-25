"use client"
import { useState } from "react"
import { supabase } from "@/lib/sap"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { BackButton } from "@/components/back"

export default function SignupForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignup = async (e: any) => {
    e.preventDefault()

    const { data: existing, error: checkErr } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .limit(1)

    if (checkErr) {
      setError("error checking username")
      return
    }

    if (existing.length > 0) {
      setError("username sudah ada!")
      return
    }

    const { error: insertErr } = await supabase
      .from("users")
      .insert([{ username, password }])

    if (insertErr) {
      setError("gagal membuat akun, tolong coba lagi")
      return
    }

    setSuccess("akun berhasil dibuat mengarahkan ke login...")

    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }

  return (
   <form
      onSubmit={handleSignup}
      className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl max-w w-screen h-screen items-center justify-center"
    >
      <input
        type="text"
        placeholder="username"
        className="p-2 rounded bg-gray-700 text-gray-100"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="password"
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

      <BackButton />
    </form>
  )
}
