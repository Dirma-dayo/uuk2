"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/sap"

type brang = {
  id: number
  name: string
  stock: number
  img: string
}

const uwoo = [
  { title: "Peminjaman Cepat", desc: "Pinjam barang hanya dalam beberapa klik." },
  { title: "Informasi Lengkap", desc: "Detail barang, stok, dan info lainnya selalu tersedia." },
]

export default function Anu() {
  const [items, setItems] = useState<brang[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  async function loadItems() {
    const { data, error } = await supabase.from("items").select("*")

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
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden">




      <header className="text-center mb-16 px-10 py-12 rounded-2xl border border-purple-600/40 bg-gray-800/50 backdrop-blur-md shadow-[0_0_30px_#a855f733]
 animate-slide-in-down">
        <h1 className="text-5xl font-bold text-purple-400 drop-shadow-lg mb-4">
          Inventaris Sarpras
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Memantau peminjaman & pengembalian barang sekolah dengan cepat dan nyaman.
        </p>
      </header>




      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-6xl">
        {uwoo.map((card,) => (
          <div
            key={card.title}
            className="bg-gray-800/60 backdrop-blur-md border border-gray-700/60 rounded-2xl shadow-lg p-8 text-center transform transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-fade-in-up"

          >
            <h2 className="text-2xl font-semibold mb-3 text-purple-400">{card.title}</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>




      <section className="w-full max-w-5xl mb-16 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center drop-shadow-md">
          Status Stok Barang
        </h2>

        {loading && <p className="text-center text-gray-300">loading…</p>}
        {!loading && items.length === 0 && <p className="text-center text-red-400">no data from supabase…</p>}

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




      <div className="flex gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
        {["Login", "About", "History"].map(text => (
          <Button
            key={text}
            className="bg-purple-600/90 text-white hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] px-8 py-3 font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            onClick={() => (window.location.href = `/${text.toLowerCase()}`)}
          >
            {text}
          </Button>
        ))}
      </div>


      <footer className="text-purple-400 text-sm drop-shadow-md animate-fade-in" style={{ animationDelay: "1200ms" }}>
        &copy; 2025 Muhammad Fahri Baadila XI RPL B
      </footer>
    </div>
  )
}
