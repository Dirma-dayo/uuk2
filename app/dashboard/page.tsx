"use client"
import { BackButton } from "@/components/back"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/sap"

type Brang = {
  id: number
  name: string
  stock: number
  img: string
}

export default function Dashboard() {
  const [items, setItems] = useState<Brang[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadItems() {
      const { data, error } = await supabase
        .from("items")
        .select("*")

      if (error) {
        console.log("supabase error:", error)
        setItems([])
      } else {
        console.log("supabase data:", data)
        setItems(data ?? [])
      }

      setLoading(false)
    }

    loadItems()
  }, [])

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-900 text-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400">
          Dashboard
        </h1>
        <BackButton />
      </div>

      <section className="w-full max-w-5xl mb-16 animate-fade-in-up mx-auto">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center drop-shadow-md">
          Status Stok Barang
        </h2>

        {loading && <p className="text-center text-gray-300">loading…</p>}
        {!loading && items.length === 0 && (
          <p className="text-center text-red-400">no data from supabase…</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="relative p-5 rounded-2xl text-center border backdrop-blur-md transition-all duration-300 transform hover:scale-[1.05] animate-fade-in-up"
              style={{ animationDelay: `${idx * 100 + 700}ms` }}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 object-contain mx-auto mb-3 drop-shadow-lg"
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className={`text-sm mt-1 ${item.stock > 0 ? "text-green-400" : "text-red-500"}`}>
                {item.stock > 0 ? `Tersisa ${item.stock}` : "Habis"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
