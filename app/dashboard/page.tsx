"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Trophy, RefreshCw } from "lucide-react"

// Import candidates from a shared location
import { candidates } from "../page" 

type VoteResult = {
  id: number
  name: string
  position: string
  voteCount: number
}

export default function DashboardPage() {
  const [results, setResults] = useState<VoteResult[]>([])
  const [loading, setLoading] = useState(true)
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    // Load votes from localStorage
    const loadVotes = () => {
      try {
        const votes = JSON.parse(localStorage.getItem('votes') || '{}');
        const voteResults: VoteResult[] = [];
        
        // Process votes for wakojur candidates
        candidates.filter(c => c.position.includes("Koordinator") && !c.position.includes("Wakil")).forEach(candidate => {
          voteResults.push({
            id: candidate.id,
            name: candidate.name,
            position: candidate.position,
            voteCount: votes[`wakojur_${candidate.id}`] || 0
          });
        });
        
        // Process votes for cawakojur candidates
        candidates.filter(c => c.position.includes("Wakil")).forEach(candidate => {
          voteResults.push({
            id: candidate.id,
            name: candidate.name,
            position: candidate.position,
            voteCount: votes[`cawakojur_${candidate.id}`] || 0
          });
        });
        
        setResults(voteResults);
      } catch (error) {
        console.error('Error loading votes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVotes();
    
    // Refresh results every 5 seconds
    const intervalId = setInterval(loadVotes, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Group results by position
  const koordinatorResults = results.filter(r => r.position.includes("Koordinator") && !r.position.includes("Wakil"));
  const wakilResults = results.filter(r => r.position.includes("Wakil"));

  // Find winners
  const getWinnerByPosition = (positionResults: VoteResult[]) => {
    if (positionResults.length === 0) return null;
    return positionResults.reduce((prev, current) => 
      (prev.voteCount > current.voteCount) ? prev : current
    );
  };

  const koordinatorWinner = getWinnerByPosition(koordinatorResults);
  const wakilWinner = getWinnerByPosition(wakilResults);

  // Add reset function
  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua data voting? Tindakan ini tidak dapat dibatalkan.")) {
      setResetting(true);
      
      // Clear votes from localStorage
      localStorage.removeItem('votes');
      
      // Reset the results state
      const resetResults = candidates.map(candidate => ({
        id: candidate.id,
        name: candidate.name,
        position: candidate.position,
        voteCount: 0
      }));
      
      setResults(resetResults);
      
      setTimeout(() => {
        setResetting(false);
      }, 1000);
    }
  };

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
      <div className="relative z-10 min-h-screen w-full p-8">
        <div className="max-w-6xl mx-auto bg-[#f5f5dc]/90 p-8 rounded-lg shadow-lg border-2 border-[#5d4037]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#5d4037]">Hasil Pemilihan ORASI RPL 2025</h1>
            <div className="flex gap-4">
              {/* Reset button */}
              <button
                onClick={handleReset}
                disabled={resetting}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={16} className={resetting ? "animate-spin" : ""} />
                Reset Data
              </button>
              
              <Link
                href="/"
                className="flex items-center gap-2 bg-[#5d4037] text-white px-4 py-2 rounded hover:bg-[#4e342e] transition-colors"
              >
                <ArrowLeft size={16} />
                Kembali
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-[#5d4037]">Loading results...</div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Winners Section */}
              <div className="bg-[#5d4037]/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-[#5d4037] mb-6 flex items-center">
                  <Trophy className="mr-2" /> Pemenang Pemilihan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {koordinatorWinner && (
                    <div className="bg-white p-6 rounded-lg shadow-md border border-[#5d4037]/20">
                      <h3 className="text-xl font-semibold text-[#5d4037] mb-2">Koordinator Jurusan</h3>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-32 overflow-hidden rounded-md border-2 border-[#5d4037]">
                          <Image
                            src={`/${koordinatorWinner.name}.png`}
                            alt={koordinatorWinner.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#5d4037]">{koordinatorWinner.name}</p>
                          <p className="text-lg text-[#5d4037]/70">
                            {koordinatorWinner.voteCount} suara
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {wakilWinner && (
                    <div className="bg-white p-6 rounded-lg shadow-md border border-[#5d4037]/20">
                      <h3 className="text-xl font-semibold text-[#5d4037] mb-2">Wakil Koordinator Jurusan</h3>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-32 overflow-hidden rounded-md border-2 border-[#5d4037]">
                          <Image
                            src={`/${wakilWinner.name}.png`}
                            alt={wakilWinner.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#5d4037]">{wakilWinner.name}</p>
                          <p className="text-lg text-[#5d4037]/70">
                            {wakilWinner.voteCount} suara
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Koordinator Results */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#5d4037]/20">
                  <h2 className="text-xl font-bold text-[#5d4037] mb-4">Calon Koordinator Jurusan</h2>
                  <div className="space-y-4">
                    {koordinatorResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-16 overflow-hidden rounded-md">
                            <Image
                              src={`/${result.name}.png`}
                              alt={result.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{result.name}</span>
                        </div>
                        <span className="font-bold text-[#5d4037]">{result.voteCount} suara</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wakil Koordinator Results */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#5d4037]/20">
                  <h2 className="text-xl font-bold text-[#5d4037] mb-4">Calon Wakil Koordinator Jurusan</h2>
                  <div className="space-y-4">
                    {wakilResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-16 overflow-hidden rounded-md">
                            <Image
                              src={`/${result.name}.png`}
                              alt={result.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{result.name}</span>
                        </div>
                        <span className="font-bold text-[#5d4037]">{result.voteCount} suara</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}