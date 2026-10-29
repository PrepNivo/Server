import pool from './pool';

// Test the database connection
async function testConnection() {
  try {
    console.log('Attempting database connection...');
    const client = await pool.connect();
    console.log('Database connection established successfully');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(-1);
  }
}

testConnection();

export default pool;
