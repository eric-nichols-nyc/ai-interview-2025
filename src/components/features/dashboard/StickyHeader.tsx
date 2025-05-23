import Link from "next/link"
import React from "react"
import { Brain } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
interface StickyHeaderProps {
  title: string
  rightContent?: React.ReactNode
}

export default function StickyHeader({ title, rightContent }: StickyHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#13131f] bg-opacity-90 backdrop-blur border-b border-[#23233a] px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-2"> <Brain className="h-6 w-6 text-primary" /> <span className="text-xl font-bold">Prepster</span></Link>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div>{rightContent}</div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </header>
  )
} 