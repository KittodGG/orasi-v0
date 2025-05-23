import { executeQuery } from '../lib/db';

async function seedDatabase() {
  try {
    // Clear existing data
    await executeQuery('DELETE FROM votes');
    await executeQuery('DELETE FROM candidates');
    
    // Reset auto-increment
    await executeQuery('ALTER TABLE candidates AUTO_INCREMENT = 1');
    await executeQuery('ALTER TABLE votes AUTO_INCREMENT = 1');
    
    // Insert candidates
    const candidates = [
      { name: 'Rizki', position: 'Calon Koordinator Jurusan' },
      { name: 'Rafi', position: 'Calon Koordinator Jurusan' },
      { name: 'Adhya', position: 'Calon Wakil Koordinator Jurusan' },
      { name: 'Hafiz', position: 'Calon Wakil Koordinator Jurusan' },
      { name: 'Raihan', position: 'Calon Wakil Koordinator Jurusan' },
    ];
    
    for (const candidate of candidates) {
      await executeQuery(
        'INSERT INTO candidates (name, position) VALUES (?, ?)',
        [candidate.name, candidate.position]
      );
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();