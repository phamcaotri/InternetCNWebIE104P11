import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_URL || 'https://eemjqagqbdhexxiknxxl.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbWpxYWdxYmRoZXh4aWtueHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwMjczNTQsImV4cCI6MjA0NTYwMzM1NH0._ojQKNK9T5uIVd-HFpU0AQAs-j2Fmr7itZ_5CRQwzMo';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;