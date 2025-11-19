import { SignupForm } from "@/components/signup-form"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-4 py-12">
      
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
