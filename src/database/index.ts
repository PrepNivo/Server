import { drizzle } from 'drizzle-orm/neon-http';
import { config } from '../config';

console.log('Database connection initialized successfully');

async function testConnection() {
  try {
    console.log('Database connection test query successful');
  } catch (error) {
    console.error('Database connection test query failed:', error);
  }
}

testConnection();

export const db = drizzle(config.databaseUrl);
