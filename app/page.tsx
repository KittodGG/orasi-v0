"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// Candidate data - export it so it can be imported in dashboard
export const candidates = [
  {
    id: 1,
    name: "Rizki",
    position: "Calon Koordinator Jurusan",
    visi: "Mendorong siswa/i RPL berkarakter baik, aktif, inspiratif, serta memiliki kemampuan berpikir kritis, kreatif, inovatif, berintegritas, berjiwa kepemimpinan, dan tetap menjaga keharmonisan dalam berinteraksi sosial.",
    pengalaman: [
      "Panitia Open House RPL SMKN 1 Cimahi (2025)", 
      "Panitia Open House SMK Negeri 1 Cimahi (2025)", 
      "Anggota MPK SMK Negeri 1 Cimahi (2025 - Sekarang)",
      "ketua Pelaksana SE-League(2025)"
    ],
    quotes: "“Unity to be real must stand the severest strain without breaking.” -Mahatma Gandhi",
  },
  {
    id: 2,
    name: "Rafi",
    position: "Calon Koordinator Jurusan",
    visi: "Menjadikan jurusan Rekayasa Perangkat Lunak sebagai jurusan yang aktif, produktif, kreatif, inovatif dan beretika dengan ilmu teknologi informasi serta berlandaskan ilmu agama yang kuat. Berani berpendapat dan memiliki rasa kekeluargaan.",
    pengalaman: [
      "Anggota MPK SMPN 47 Bandung (2021 - 2022)",
      "Wakil Ketua Pecinta Lingkungan SMPN 47 Bandung (2022 - 2023)",
      "Ketua Pelaksana Bukber FORPEC (2025)",
      "Ketua Pelaksana Open House RPL (2025)"
    ],
    quotes: "“Perubahan tidak akan datang jika kita menunggu orang lain atau waktu lain. Kita adalah orang-orang yang kita tunggu-tunggu. Kita adalah perubahan yang kita cari.” -Barrack Obama",
  },
  {
    id: 3,
    name: "Adhya",
    position: "Calon Wakil Koordinator Jurusan",
    visi: "Mewujudkan jurusan Rekayasa Perangkat Lunak (RPL) yang unggul dalam prestasi, aktif dalam kegiatan, serta solid dalam kerja sama, dengan mengedepankan semangat kekeluargaan, inovasi, dan profesionalisme.",
    pengalaman: [
      "Panitia Divisi Acara Pentas Seni SMP Negeri 1 Cimahi “ESTHALAMOR” (2023)",
      "Bendahara Ekskul KIR Matematika SMP Negeri 1 Cimahi (2023-2024)",
      "Panitia Divisi Acara Open House RPL (2025)"
    ],
    quotes: "“Kita sering terlalu sibuk mengejar kesempurnaan, sampai lupa bahwa saling menguatkan adalah hal yang jauh lebih bermakna.” -Anonymous 2025",
  },
  {
    id: 4,
    name: "Hafiz",
    position: "Calon Wakil Koordinator Jurusan",
    visi: "Menjadikan jurusan Rekayasa Perangkat Lunak yang beretika, aktif, dan berlandaskan nilai-nilai agama, serta membentuk siswa-siswi yang cerdas, bertanggung jawab, dan menjunjung tinggi kebersamaan.",
    pengalaman: [
      "Ketua Basket SMP Negeri 2 Ngamprah tahun 2024-2025",
      "Panitia Buka Bersama tahfidz qur’an 2021 - 2022/2022 - 2023",
      "Anggota MPK Smpn 2 Ngamprah (2022-2023)",
      "Panitia Open House 2025"
    ],
    quotes:
      "“Tujuan utama dari pembelajaran adalah menguasai hal baru. Yang perlu diperhatikan adalah bagaimana menemukan strategi belajar yang tepat. Ketika proses belajar terasa tidak lancar, itu bukan karena seseorang kurang cerdas, melainkan karena strategi yang sesuai belum ditemukan.” -Carol S. Dweck, ph.D.",
  },
  {
    id: 5,
    name: "Raihan",
    position: "Calon Wakil Koordinator Jurusan",
    visi: "Meningkatkan serta mengembangkan ruang lingkup RPL sebagai ruang belajar dan sosial yang semakin teratur, terintegrasi, produktif tanpa meninggalkan aspek keagamaan serta keharmonisan antar sesama demi terciptanya anggota jurusan yang inovatif, produktif dan juga kreatif.",
    pengalaman: [
      "Anggota Osis SMPN 2 Batujajar Sekbid 1 : 2021 - 2022",
      "Ketua Osis SMPN 2 Batujajar 2022 - 2023",
      "Duta Genre Putra SMKN 1 Cimahi 2024 - 2025",
      "Koordinator Angkatan 51 PIK - R SMKN 1 Cimahi 2024 - Sekarang"
    ],
    quotes:
      "“Hatiku tenang karena mengetahui bahwa apa yang melewatkanku tidak akan pernah menjadi takdirku, dan apa yang ditakdirkan untukku tidak akan pernah melewatkanku” -Umar bin Khattab",
  },
]

export default function Home() {
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof candidates)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVotingOpen, setIsVotingOpen] = useState(false)
  const [votingStep, setVotingStep] = useState<'wakojur' | 'cawakojur'>('wakojur')
  const [cardPositions, setCardPositions] = useState<Array<{ top: string; left: string; rotate: string }>>([])
  const [selectedWakojur, setSelectedWakojur] = useState<string | null>(null)
  const [selectedCawakojur, setSelectedCawakojur] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [voteSuccess, setVoteSuccess] = useState(false)

  // Generate fixed positions for cards without overlap
  useEffect(() => {
    // Define fixed positions for each card
    const positions = candidates.map((candidate) => {
      let top, left, rotate;
      
      // Left side (IDs 3-5)
      if (candidate.id >= 3) {
        // Calculate vertical spacing for left side cards
        const verticalPosition = (candidate.id - 3) * 30 + 20; // 20%, 50%, 80% from top
        top = `${verticalPosition}%`;
        left = `${Math.random() * 10 + 10}%`; // 10-20% from left (moved further left)
        
        // Alternate rotation for left side cards
        if (candidate.id === 3) {
          rotate = `${Math.random() * 5 + 3}deg`; // Slight right tilt (3 to 8 degrees)
        } else if (candidate.id === 4) {
          rotate = `-${Math.random() * 5 + 3}deg`; // Slight left tilt (-3 to -8 degrees)
        } else {
          rotate = `${Math.random() * 2 - 1}deg`; // Almost straight (-1 to 1 degrees)
        }
      } 
      // Right side (IDs 1-2)
      else {
        // Calculate vertical spacing for right side cards
        const verticalPosition = (candidate.id - 1) * 40 + 30; // 30%, 70% from top
        top = `${verticalPosition}%`;
        left = `${Math.random() * 10 + 75}%`; // 75-85% from left (moved further right)
        
        // Alternate rotation for right side cards
        if (candidate.id === 1) {
          rotate = `-${Math.random() * 5 + 3}deg`; // Slight left tilt (-3 to -8 degrees)
        } else {
          rotate = `${Math.random() * 5 + 3}deg`; // Slight right tilt (3 to 8 degrees)
        }
      }
      
      return { top, left, rotate };
    });
    
    setCardPositions(positions);
  }, []);

  const handleCardClick = (candidate: (typeof candidates)[0]) => {
    setSelectedCandidate(candidate)
    setIsDialogOpen(true)
  }

  const handleVoteClick = () => {
    setIsVotingOpen(true)
    setVotingStep('wakojur')
  }

  const handleContinue = () => {
    if (selectedWakojur) {
      setVotingStep('cawakojur')
    } else {
      alert("Silakan pilih satu kandidat untuk posisi Koordinator Jurusan.")
    }
  }

  const handleVoteSubmit = async () => {
    if (selectedWakojur && selectedCawakojur) {
      setIsSubmitting(true)
      
      try {
        // Find the candidate IDs based on names
        const wakojurCandidate = candidates.find(c => c.name === selectedWakojur);
        const cawakojurCandidate = candidates.find(c => c.name === selectedCawakojur);
        
        if (wakojurCandidate && cawakojurCandidate) {
          // Store votes in localStorage for simplicity
          // In a real app, this would be an API call to a database
          const votes = JSON.parse(localStorage.getItem('votes') || '{}');
          
          // Increment votes for wakojur
          votes[`wakojur_${wakojurCandidate.id}`] = (votes[`wakojur_${wakojurCandidate.id}`] || 0) + 1;
          
          // Increment votes for cawakojur
          votes[`cawakojur_${cawakojurCandidate.id}`] = (votes[`cawakojur_${cawakojurCandidate.id}`] || 0) + 1;
          
          // Save back to localStorage
          localStorage.setItem('votes', JSON.stringify(votes));
          
          alert(`Terima kasih! Anda telah memilih ${selectedWakojur} sebagai Wakojur dan ${selectedCawakojur} sebagai Cawakojur.`);
          setIsVotingOpen(false);
          setSelectedWakojur(null);
          setSelectedCawakojur(null);
          setVotingStep('wakojur');
        }
      } catch (error) {
        console.error('Error submitting votes:', error);
        alert('Terjadi kesalahan saat mengirim suara. Silakan coba lagi.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Silakan pilih satu kandidat untuk posisi Wakil Koordinator Jurusan.");
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/BgOrasi.jpg"
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
                width: "130px", // Reduced from 160px to 140px for smaller card width
                zIndex: 10 + index,
              }}
              onClick={() => handleCardClick(candidate)}
            >
              <div className="relative w-full shadow-lg transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ aspectRatio: "2.5/3.5" }}>
                <Image
                  src={`/${candidate.name}.png`}
                  alt={candidate.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110 brightness-75 opacity-90 group-hover:brightness-100 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>

                {/* Name tag */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#5d4037]/80 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[#e0e0e0] font-bold text-center text-sm">{candidate.name}</p>
                  <p className="text-[#bdbdbd] text-xs text-center">{candidate.position}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom center button with rotation */}
          <div
            className="absolute bottom-28 left-[55%] transform -translate-x-1/2 rotate-[-4deg] z-50 cursor-pointer"
            onClick={handleVoteClick}
          >
            <button 
              className="bg-[transparent] text-lg text-[#691709] px-6 py-3 rounded-xl shadow-lg border-2 border-[#7f1b0e] hover:bg-[transparent] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] hover:rotate-2 hover:scale-105 font-bold"
            >
              !!! VOTE HERE !!!
            </button>
          </div>
          
          {/* Dashboard link */}
          <div
            className="absolute bottom-10 right-10 z-50"
          >
            <Link 
              href="/dashboard"
              className="bg-[#5d4037] text-white px-4 py-2 rounded-md shadow-lg hover:bg-[#4e342e] transition-colors"
            >
              View Results
            </Link>
          </div>
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
                    src={`/${selectedCandidate.name}.png`}
                    alt={selectedCandidate.name}
                    fill
                    className="object-cover border-2 border-[#5d4037]"
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <div>
                    <h3 className="text-[#5d4037] font-bold">Posisi</h3>
                    <p className="text-[#5d4037]/80">{selectedCandidate.position}</p>
                  </div>

                  <div>
                    <h3 className="text-[#5d4037] font-bold">Visi</h3>
                    <p className="text-[#5d4037]/80">{selectedCandidate.visi}</p>
                  </div>

                  <div>
                    <h3 className="text-[#5d4037] font-bold">Pengalaman</h3>
                    <ul className="list-disc pl-5 text-[#5d4037]/80">
                      {selectedCandidate.pengalaman.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[#5d4037] font-bold">Quotes</h3>
                    <p className="text-[#5d4037]/80 italic">"{selectedCandidate.quotes}"</p>
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

      {/* Voting dialog */}
      <Dialog open={isVotingOpen} onOpenChange={setIsVotingOpen}>
        <DialogContent className="max-w-4xl bg-[#f5f5dc] border-[#5d4037]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#5d4037] flex items-center gap-2">
              <span>Voting Ballot</span>
            </DialogTitle>
            <DialogDescription className="text-[#5d4037]/80">
              {votingStep === 'wakojur' 
                ? 'Pilih satu kandidat untuk posisi Koordinator Jurusan' 
                : 'Pilih satu kandidat untuk posisi Wakil Koordinator Jurusan'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 my-4">
            {/* Wakojur Selection */}
            {votingStep === 'wakojur' && (
              <div>
                <h3 className="text-xl font-bold text-[#5d4037] mb-4">Pemilihan Koordinator Jurusan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["Rizki", "Rafi"].map((name) => (
                    <div 
                      key={name} 
                      className={`relative cursor-pointer transition-all duration-300 ${
                        selectedWakojur === name ? "ring-4 ring-[#5d4037] scale-105" : "hover:scale-105"
                      }`}
                      onClick={() => setSelectedWakojur(name)}
                    >
                      <div className="relative aspect-[3/4] w-full h-96">
                        <Image
                          src={`/${name}PC.png`}
                          alt={name}
                          fill
                          className="object-cover rounded-md"
                        />
                        <div className={`absolute inset-0 bg-black/10 rounded-md ${
                          selectedWakojur === name ? "bg-transparent" : ""
                        }`}></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-[#5d4037]/80 p-2 rounded-b-md">
                        <p className="text-white font-bold text-center">{name}</p>
                        <p className="text-gray-200 text-sm text-center">Calon Koordinator Jurusan</p>
                      </div>
                      {selectedWakojur === name && (
                        <div className="absolute top-2 right-2 bg-[#5d4037] text-white rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cawakojur Selection */}
            {votingStep === 'cawakojur' && (
              <div>
                <h3 className="text-xl font-bold text-[#5d4037] mb-4">Pemilihan Wakil Koordinator Jurusan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Adhya", "Hafiz", "Raihan"].map((name) => (
                    <div 
                      key={name} 
                      className={`relative cursor-pointer transition-all duration-300 ${
                        selectedCawakojur === name ? "ring-4 ring-[#5d4037] scale-105" : "hover:scale-105"
                      }`}
                      onClick={() => setSelectedCawakojur(name)}
                    >
                      <div className="relative aspect-[3/4] w-full">
                        <Image
                          src={`/${name}PC.png`}
                          alt={name}
                          fill
                          className="object-cover rounded-md"
                        />
                        <div className={`absolute inset-0 bg-black/10 rounded-md ${
                          selectedCawakojur === name ? "bg-transparent" : ""
                        }`}></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-[#5d4037]/80 p-2 rounded-b-md">
                        <p className="text-white font-bold text-center">{name}</p>
                        <p className="text-gray-200 text-sm text-center">Calon Wakil Koordinator Jurusan</p>
                      </div>
                      {selectedCawakojur === name && (
                        <div className="absolute top-2 right-2 bg-[#5d4037] text-white rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              onClick={() => {
                if (votingStep === 'cawakojur') {
                  setVotingStep('wakojur')
                } else {
                  setIsVotingOpen(false)
                }
              }}
            >
              {votingStep === 'cawakojur' ? 'Back' : 'Cancel'}
            </button>
            
            {votingStep === 'wakojur' ? (
              <button
                className="bg-[#5d4037] text-white px-6 py-2 rounded hover:bg-[#4e342e] transition-colors"
                onClick={handleContinue}
              >
                Continue
              </button>
            ) : (
              <button
                className="bg-[#5d4037] text-white px-6 py-2 rounded hover:bg-[#4e342e] transition-colors"
                onClick={handleVoteSubmit}
              >
                Submit Vote
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
