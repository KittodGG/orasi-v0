import { NextResponse } from 'next/server';
import { incrementVote } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { candidateId } = await request.json();
    
    if (!candidateId) {
      return NextResponse.json(
        { error: 'Candidate ID is required' },
        { status: 400 }
      );
    }

    const result = await incrementVote(Number(candidateId));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}