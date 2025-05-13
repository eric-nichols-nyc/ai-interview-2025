import React from "react"

interface StickyHeaderProps {
  title: string
  rightContent?: React.ReactNode
}

export default function StickyHeader({ title, rightContent }: StickyHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#13131f] bg-opacity-90 backdrop-blur border-b border-[#23233a] px-4 py-3 flex items-center justify-between">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div>{rightContent}</div>
    </header>
  )
} 