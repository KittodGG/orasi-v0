"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function VotingPage() {
  const [activeTab, setActiveTab] = useState("voting")

  const candidates = [
    { id: 1, name: "RAHMAT", position: "KAJUR" },
    { id: 2, name: "MUFIDA", position: "KAJUR" },
    { id: 3, name: "ILHAM", position: "KAJUR" },
  ]

  return (
    <main className="detective-bg min-h-screen flex flex-col items-center justify-center p-4">
      <nav className="fixed top-0 left-0 right-0 flex justify-end p-4 z-50">
        <div className="flex gap-6 bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full">
          <Link
            href="#"
            className={`nav-link ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </Link>
          <Link
            href="#"
            className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            Contact
          </Link>
          <Link
            href="/voting"
            className={`nav-link ${activeTab === "voting" ? "active" : ""}`}
            onClick={() => setActiveTab("voting")}
          >
            Voting
          </Link>
        </div>
      </nav>

      <div className="paper p-8 rounded-lg max-w-3xl w-full">
        <h2 className="text-[#444444] text-3xl font-bold mb-8 text-center">Voting Panel Cawakajur</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex flex-col items-center">
              <div className="border-2 border-[#4f4f4f] p-1 mb-2">
                <Image
                  src="/placeholder.svg?height=200&width=150"
                  alt={candidate.name}
                  width={150}
                  height={200}
                  className="object-cover"
                />
              </div>
              <p className="text-[#444444] font-bold">{candidate.name}</p>
              <p className="text-[#4f4f4f] text-sm">{candidate.position}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#4f4f4f] text-white px-4 py-2 rounded hover:bg-[#333333] transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </Link>
        </div>
      </div>
    </main>
  )
}
