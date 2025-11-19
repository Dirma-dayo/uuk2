"use client"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-4 py-12">
      <div className="w-full max-w-md flex justify-center">
        <LoginForm/>
      </div>
    </div>
  )
}
