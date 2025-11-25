"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ItemCardProps {
  item: { name: string; stock: number; img: string }
  mode: "pinjam" | "kembalikan"
  counter: number
  onChange: (delta: number) => void
  onAction: () => void
  className?: string
}

export function ItemCard({ item, mode, counter, onChange, onAction, className }: ItemCardProps) {
  return (
    <Card className={`bg-gray-800 border border-gray-700 p-4 flex flex-col items-center gap-3 shadow-lg text-white ${className}`}>
      <div className="w-24 h-24 bg-gray-900 rounded-lg flex justify-center items-center overflow-hidden">
        <img src={item.img} alt={item.name} className="object-contain w-full h-full" />
      </div>

      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-400 font-semibold">Sisa: {item.stock}</p>

      <div className="flex items-center gap-2 mt-2">
        <Button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded" onClick={() => onChange(-1)}>
          -
        </Button>
        <span className="px-4 py-1 bg-gray-700 rounded text-center w-10">{counter}</span>
        <Button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded" onClick={() => onChange(+1)}>
          +
        </Button>
      </div>

      <Button className="mt-2 bg-purple-600 px-4 py-2 rounded hover:bg-purple-500" onClick={onAction}>
        {mode === "pinjam" ? "Pinjam" : "Kembalikan"}
      </Button>
    </Card>
  )
}
