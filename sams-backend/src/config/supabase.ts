import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Supabase environment variables are missing.');
}

// Service Role client bypasses RLS - use carefully in backend
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

try {
  const payload = JSON.parse(Buffer.from(supabaseServiceKey.split('.')[1], 'base64').toString());
  console.log('🔑 Supabase key role in use:', payload.role);
} catch (e) {
  console.log('🔑 Could not decode key');
}


