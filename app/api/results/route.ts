import { NextResponse } from 'next/server';
import { getVoteCounts, getWinners } from '@/lib/db';

export async function GET() {
  try {
    const voteCounts = await getVoteCounts();
    const winners = await getWinners();
    
    return NextResponse.json({ 
      voteCounts,
      winners
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}