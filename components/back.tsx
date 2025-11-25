"use client"

import { Button } from "./ui/button"

interface BackButtonProps {
  href?: string
  className?: string
}

export function BackButton({ href = "/", className = "" }: BackButtonProps) {
  return (
    <Button
      className={`bg-red-600 hover:bg-red-500 px-4 py-2 rounded mb-4 ${className}`}
      onClick={() => (window.location.href = href)}
    >
      Kembali
    </Button>
  )
}
