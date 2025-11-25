"use client"

import { useEffect, useState } from "react"
import { BackButton } from "@/components/back"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, Phone, Github, Code2, Monitor, Palette } from "lucide-react"
import Image from "next/image"


export default function AboutPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, when: "beforeChildren" },
    },
  }

  const item: any = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.58, 1] } },
}



  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate={loaded ? "show" : "hidden"}
        variants={container}
        className="w-full max-w-2xl"
      >
        <Card className="relative bg-gray-800/70 border border-gray-700 p-8 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden">
          {/* back button */}
          <div className="absolute top-4 left-4">
            <BackButton />
          </div>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl font-bold text-purple-400 mb-4 text-center"
          >
            Tentang Aplikasi Ini
          </motion.h1>

          <motion.p
            variants={item}
            className="text-gray-300 mb-4 text-center max-w-xl mx-auto leading-relaxed"
          >
            Aplikasi inventaris sederhana untuk meminjam dan mengembalikan barang laboratorium /
            sarpras sekolah. Semua data disimpan secara lokal (LocalStorage) sehingga mudah untuk
            dipakai tanpa server.
          </motion.p>

          <motion.div variants={item} className="grid gap-6 md:grid-cols-2 mt-6 relative">
  {/* vertical separator for larger screens */}
  <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-purple-700/50"></div>

            {/* Fitur */}
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Fitur Utama</h3>
              <ul className="text-gray-300 list-inside space-y-2">
                <li>- Pinjam & kembalikan barang (UI + LocalStorage)</li>
                <li>- Riwayat transaksi (semua pengguna)</li>
                <li>- Tampilan akun & daftar barang yang dipinjam</li>
                <li>- Tampilan responsif & animasi halus</li>
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-3">Info & Kontak</h3>

              <p className="text-gray-300 mb-1">
                Pembuat: <strong>Muhammad Fahri Baadila</strong>
              </p>
              <p className="text-gray-300 mb-3">Kelas: XI RPL B</p>

              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <a
                  href="mailto:fahribaadila3@gmail.com"
                  className="flex items-center gap-2 hover:text-purple-300 transition-colors"
                >
                  <Mail size={16} /> fahribaadila3@gmail.com
                </a>
                <p className="flex items-center gap-2">
                  <Phone size={16} /> +62 823-3085-3138
                </p>
                <a
                  href="https://github.com/Dirma-dayo"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-purple-300 transition-colors"
                >
                  <Github size={16} /> github.com/Dirma-dayo
                </a>
                <p className="flex items-center gap-2">
  <Image src="/discord.png" alt="Discord" width={16} height={16} className="rounded-sm" /> @dirma
</p>
              </div>
            </div>
          </motion.div>

          {/* Stack */}
          <motion.div variants={item} className="mt-8">
            <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <Code2 size={18} className="text-purple-400" /> Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="text-sm px-3 py-1 rounded-full bg-gray-700/40 border border-gray-600 text-gray-200 flex items-center gap-1">
                <Monitor size={14} /> Next.js
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-700/40 border border-gray-600 text-gray-200 flex items-center gap-1">
                <Code2 size={14} /> React
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-700/40 border border-gray-600 text-gray-200 flex items-center gap-1">
                <Palette size={14} /> Tailwind CSS
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-700/40 border border-gray-600 text-gray-200 flex items-center gap-1">
                <Code2 size={14} /> shadcn/ui
              </span>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div variants={item} className="mt-8 text-center">
            <p className="text-gray-400 text-sm leading-relaxed">
              Aplikasi ini dibuat untuk keperluan tugas/pembelajaran. Bisa juga dipakai beneran,
              tapi datanya masih lokal aja (LocalStorage). 
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
