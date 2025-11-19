"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useDashboardData } from "@/components/hook/useDashboardData"
import { ItemCard } from "@/components/cards"

export default function DashboardPage() {
  const { mode, setMode, items, counters, currentUser, changeCounter, handleCardAction } = useDashboardData()
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    if (mode) setTimeout(() => setShowBack(true), 300)
    else setShowBack(false)
  }, [mode])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-purple-400 mb-2">Dashboard Sarpras</h1>
          <p className="text-gray-300">Pilih aksi untuk memulai</p>
        </div>
        <Button
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("currentUser")
            window.location.href = "/login"
          }}
        >
          Logout
        </Button>
      </header>

      {/* Back Button */}
      <AnimatePresence>
        {showBack && (
          <motion.div
            key="back-button"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Button
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg shadow-lg"
              onClick={() => setMode(null)}
            >
              ← Kembali
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode / Cards */}
      <div className="flex justify-center items-center h-[60vh] flex-col">
        <AnimatePresence mode="wait">
          {!mode ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex gap-6"
            >
              <Button className="bg-purple-600 px-6 py-3 hover:bg-purple-500 rounded-lg shadow-lg" onClick={() => setMode("pinjam")}>Pinjam</Button>
              <Button className="bg-purple-600 px-6 py-3 hover:bg-purple-500 rounded-lg shadow-lg" onClick={() => setMode("kembalikan")}>Kembalikan</Button>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
              {items.map((item) => (
                <ItemCard
                  key={item.name}
                  item={item}
                  mode={mode}
                  counter={counters[item.name] || 0}
                  onChange={(delta) => changeCounter(item.name, delta)}
                  onAction={() => handleCardAction(item.name)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Borrowed */}
      <div className="mt-10 flex flex-col md:flex-row md:justify-between gap-6">
        <div className="bg-gray-800 border border-gray-700 p-4 shadow-lg flex-1">
          <h2 className="text-lg font-bold text-purple-400 mb-2">Barang Dipinjam</h2>
          <div className="max-h-64 overflow-y-auto flex flex-col gap-1">
            {currentUser?.borrowed &&
              Object.entries(currentUser.borrowed)
                .filter(([_, qty]) => qty > 0)
                .map(([item, qty]) => (
                  <p key={item} className="text-gray-300 text-sm">
                    <strong>{item}</strong> x{qty}
                  </p>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}
