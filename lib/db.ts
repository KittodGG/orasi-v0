import mysql from 'mysql2/promise';
import { cache } from 'react';

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orasi_voting_db',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute SQL queries
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Cached function to get all candidates
export const getCandidates = cache(async () => {
  const candidates = await executeQuery(
    'SELECT * FROM candidates ORDER BY position, id'
  );
  return candidates;
});

// Function to get candidates by position
export async function getCandidatesByPosition(position: string) {
  const candidates = await executeQuery(
    'SELECT * FROM candidates WHERE position = ? ORDER BY id',
    [position]
  );
  return candidates;
}

// Function to get vote counts
export async function getVoteCounts() {
  const voteCounts = await executeQuery(`
    SELECT c.id, c.name, c.position, v.vote_count 
    FROM candidates c
    LEFT JOIN votes v ON c.id = v.candidate_id
    ORDER BY c.position, v.vote_count DESC
  `);
  return voteCounts;
}

// Function to increment vote count for a candidate
export async function incrementVote(candidateId: number) {
  // Check if the candidate already has a vote record
  const existingVote = await executeQuery(
    'SELECT * FROM votes WHERE candidate_id = ?',
    [candidateId]
  );

  if (Array.isArray(existingVote) && existingVote.length > 0) {
    // Update existing vote count
    await executeQuery(
      'UPDATE votes SET vote_count = vote_count + 1 WHERE candidate_id = ?',
      [candidateId]
    );
  } else {
    // Create new vote record with count 1
    await executeQuery(
      'INSERT INTO votes (candidate_id, vote_count) VALUES (?, 1)',
      [candidateId]
    );
  }

  return { success: true };
}

// Function to get winners for each position
export async function getWinners() {
  const winners = await executeQuery(`
    SELECT c.position, c.name, v.vote_count
    FROM candidates c
    JOIN votes v ON c.id = v.candidate_id
    WHERE (c.position, v.vote_count) IN (
      SELECT c2.position, MAX(v2.vote_count)
      FROM candidates c2
      JOIN votes v2 ON c2.id = v2.candidate_id
      GROUP BY c2.position
    )
    ORDER BY c.position
  `);
  return winners;
}