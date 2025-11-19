"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/sap"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg("")

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match")
      return
    }

    setLoading(true)

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password }])
      .select()

    if (error) {
      setErrorMsg(error.message)
    } else {
      // redirect to login after success
      router.push("/login")
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Card {...props} className="w-full max-w-md bg-gray-800/50 backdrop-blur-md border border-purple-600/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-purple-400">Create an account</CardTitle>
          <CardDescription className="text-gray-200">
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username" className="text-white">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="AAAAA"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-white"
                />
                <FieldDescription className="text-gray-300">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm-password" className="text-white">Confirm Password</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-white"
                />
                <FieldDescription className="text-gray-300">
                  Please confirm your password.
                </FieldDescription>
              </Field>

              {errorMsg && <p className="text-red-400 text-center">{errorMsg}</p>}

              <Field className="flex flex-col gap-3 mt-4">
                <Button
                  type="submit"
                  className="bg-purple-600/90 hover:bg-purple-500 w-full"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center text-gray-300 mt-2">
                  Already have an account? <a href="/login" className="underline text-purple-400 hover:text-purple-300">Log in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SignupPage() {
  return <SignupForm />
}
