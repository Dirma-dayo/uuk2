"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BackButton } from "./back"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldLabel, FieldSeparator, FieldGroup, FieldDescription } from "@/components/ui/field"
import { Input } from "./ui/input"
import { supabase } from "@/lib/sap"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single()

    if (error || !data) {
      setError("Invalid username or password")
    } else {
      router.push("/dashboard")
    }

    setLoading(false)
  }

  return (
    <div className=" px-4 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 min-h-screen flex flex-col items-center">
      
      <header className="text-center mb-12 px-10 py-8 rounded-2xl border border-purple-600/40 bg-gray-800/50 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.2)] animate-slide-in-down w-full max-w-md">
        <h1 className="text-4xl font-bold text-purple-400 drop-shadow-lg mb-2">Welcome Back</h1>
        <p className="text-gray-200 text-sm max-w-md mx-auto leading-relaxed">
          Login to manage your inventory quickly and securely.
        </p>
      </header>

      <Card className="w-full max-w-md backdrop-blur-md bg-gray-800/50 border border-gray-700/60 shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-purple-400">Login</CardTitle>
          <CardDescription className="text-gray-300">
            Use your username and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <FieldGroup>
              <FieldSeparator></FieldSeparator>

              <Field>
                <FieldLabel htmlFor="username" className="text-white">Username</FieldLabel>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="your username" 
                  required 
                  className="text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                  <a href="#" className="ml-auto text-sm text-purple-400 underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <Field>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-purple-600/90 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] px-8 py-3 font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  {loading ? "Logging in…" : "Login"}
                </Button>
                <FieldDescription className="text-center text-gray-300">
                  Don&apos;t have an account? <a href="/signup" className="text-purple-400 underline hover:text-purple-300">Sign up</a>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <footer className="text-purple-400 text-sm drop-shadow-md mt-10 animate-fade-in">
        <BackButton/>
      </footer>
    </div>
  )
}
