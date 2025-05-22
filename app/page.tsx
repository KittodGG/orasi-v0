"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// Candidate data
const candidates = [
  {
    id: 1,
    name: "Rahmat",
    position: "Department Chair Candidate",
    bio: "Experienced leader with 5+ years in academic administration. Focused on curriculum innovation and student success.",
    achievements: ["Published 15+ research papers", "Secured 3 major grants", "Mentored 20+ graduate students"],
    vision: "To transform our department into a leading center for innovation and research excellence.",
  },
  {
    id: 2,
    name: "Mufida",
    position: "Department Chair Candidate",
    bio: "Strategic thinker with strong industry connections. Dedicated to bridging academic theory with practical applications.",
    achievements: [
      "Led 4 industry collaboration projects",
      "Developed 2 patented technologies",
      "Organized international conference",
    ],
    vision: "To strengthen industry partnerships and prepare students for real-world challenges.",
  },
  {
    id: 3,
    name: "Ilham",
    position: "Department Chair Candidate",
    bio: "Innovative educator with a passion for technology integration in learning. Advocate for inclusive education.",
    achievements: [
      "Pioneered digital learning platform",
      "Received teaching excellence award",
      "Led curriculum redesign initiative",
    ],
    vision: "To create an inclusive learning environment that embraces technological innovation.",
  },
  {
    id: 4,
    name: "Anisa",
    position: "Department Chair Candidate",
    bio: "Research-focused academic with international experience. Committed to fostering collaborative research environments.",
    achievements: [
      "Published in top-tier journals",
      "Established international research network",
      "Secured significant research funding",
    ],
    vision:
      "To elevate our department's research profile on the global stage while nurturing the next generation of innovators.",
  },
  {
    id: 5,
    name: "Budi",
    position: "Department Chair Candidate",
    bio: "Technology entrepreneur turned educator. Brings practical industry insights and entrepreneurial mindset to academia.",
    achievements: [
      "Founded two successful tech startups",
      "Developed industry-academia partnership program",
      "Mentored student entrepreneurs",
    ],
    vision:
      "To create an entrepreneurial ecosystem that prepares students for the rapidly evolving technological landscape.",
  },
]

export default function Home() {
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof candidates)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cardPositions, setCardPositions] = useState<Array<{ top: string; left: string; rotate: string }>>([])

  // Generate random positions for cards
  useEffect(() => {
    const positions = candidates.map(() => {
      const top = `${Math.random() * 60 + 15}%` // Between 15% and 75% from top
      const left = `${Math.random() * 70 + 10}%` // Between 10% and 80% from left
      const rotate = `${Math.random() * 20 - 10}deg` // Between -10 and 10 degrees
      return { top, left, rotate }
    })
    setCardPositions(positions)
  }, [])

  const handleCardClick = (candidate: (typeof candidates)[0]) => {
    setSelectedCandidate(candidate)
    setIsDialogOpen(true)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Orasi%20User%20%28No%20Navbar%29-2u0fK8dqTyIrmzqfwUmYmSLtCozG4k.png"
          alt="Detective desk background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen w-full">
        {/* Scattered candidate cards */}
        <div className="w-full h-screen relative">
          {candidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className="candidate-card group absolute cursor-pointer"
              style={{
                top: cardPositions[index]?.top || "50%",
                left: cardPositions[index]?.left || "50%",
                transform: `translate(-50%, -50%) rotate(${cardPositions[index]?.rotate || "0deg"})`,
                width: "160px", // Smaller card width
                zIndex: 10 + index,
              }}
              onClick={() => handleCardClick(candidate)}
            >
              <div className="relative w-full shadow-lg" style={{ aspectRatio: "9/16" }}>
                <Image
                  src={`/placeholder.svg?height=360&width=202&text=${candidate.name}`}
                  alt={candidate.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                {/* Name tag */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#5d4037]/80 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[#e0e0e0] font-bold text-center text-sm">{candidate.name}</p>
                  <p className="text-[#bdbdbd] text-xs text-center">{candidate.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-[#f5f5dc] border-[#5d4037]">
          {selectedCandidate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#5d4037] flex items-center gap-2">
                  <span>Candidate File: {selectedCandidate.name}</span>
                </DialogTitle>
                <DialogDescription className="text-[#5d4037]/80">
                  Confidential information - For voting committee only
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="col-span-1 relative h-48 md:h-full">
                  <Image
                    src={`/placeholder.svg?height=360&width=202&text=${selectedCandidate.name}`}
                    alt={selectedCandidate.name}
                    fill
                    className="object-cover border-2 border-[#5d4037]"
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <div>
                    <h3 className="text-[#5d4037] font-bold">Position</h3>
                    <p className="text-[#5d4037]/80">{selectedCandidate.position}</p>
                  </div>

                  <div>
                    <h3 className="text-[#5d4037] font-bold">Biography</h3>
                    <p className="text-[#5d4037]/80">{selectedCandidate.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-[#5d4037] font-bold">Key Achievements</h3>
                    <ul className="list-disc pl-5 text-[#5d4037]/80">
                      {selectedCandidate.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[#5d4037] font-bold">Vision Statement</h3>
                    <p className="text-[#5d4037]/80 italic">"{selectedCandidate.vision}"</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  className="bg-[#5d4037] text-white px-4 py-2 rounded hover:bg-[#4e342e] transition-colors"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close File
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
