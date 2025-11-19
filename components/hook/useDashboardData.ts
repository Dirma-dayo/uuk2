"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/sap"

interface Item {
  id: string
  name: string
  stock: number
  img: string
}

interface User {
  id: string
  username: string
  borrowed: Record<string, number>
}

export function useDashboardData() {
  const [items, setItems] = useState<Item[]>([])
  const [counters, setCounters] = useState<Record<string, number>>({})
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [mode, setMode] = useState<"pinjam" | "kembalikan" | null>(null)

  useEffect(() => {
    async function load() {
      // fetch items
      const { data: itemsData, error: itemsErr } = await supabase.from("items").select("*")
      if (itemsErr) console.log(itemsErr)
      else setItems(itemsData || [])

      // fetch current user (stored in localStorage)
      const userId = localStorage.getItem("currentUser")
      if (!userId) return
      const { data: userData, error: userErr } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single()
      if (userErr) console.log(userErr)
      else setCurrentUser(userData as User)
    }

    load()
  }, [])

  const changeCounter = (name: string, delta: number) => {
    setCounters((prev) => {
      const val = prev[name] ?? 0
      const itemStock = items.find((i) => i.name === name)?.stock ?? 0
      let newVal = val + delta
      if (newVal < 0) newVal = 0
      if (mode === "pinjam" && newVal > itemStock) newVal = itemStock
      return { ...prev, [name]: newVal }
    })
  }

  const handleCardAction = async (name: string) => {
    if (!currentUser) return
    const qty = counters[name] || 0
    if (qty <= 0) return

    const item = items.find((i) => i.name === name)
    if (!item) return

    if (mode === "pinjam") {
      // subtract stock
      await supabase.from("items").update({ stock: item.stock - qty }).eq("id", item.id)

      // update user borrowed
      const borrowed = { ...(currentUser.borrowed || {}) }
      borrowed[name] = (borrowed[name] || 0) + qty
      await supabase.from("users").update({ borrowed }).eq("id", currentUser.id)
      setCurrentUser({ ...currentUser, borrowed })
    } else if (mode === "kembalikan") {
      // add stock back
      await supabase.from("items").update({ stock: item.stock + qty }).eq("id", item.id)

      // update user borrowed
      const borrowed = { ...(currentUser.borrowed || {}) }
      borrowed[name] = Math.max((borrowed[name] || 0) - qty, 0)
      await supabase.from("users").update({ borrowed }).eq("id", currentUser.id)
      setCurrentUser({ ...currentUser, borrowed })
    }

    // update items in state
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, stock: mode === "pinjam" ? i.stock - qty : i.stock + qty } : i))
    )

    // reset counter
    setCounters((prev) => ({ ...prev, [name]: 0 }))
  }

  return { items, counters, changeCounter, handleCardAction, currentUser, mode, setMode }
}
