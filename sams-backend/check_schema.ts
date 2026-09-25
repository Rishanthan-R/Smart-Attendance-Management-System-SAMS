import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function checkSchema() {
  const tables = ['modules', 'sessions', 'enrollments', 'attendance'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    console.log(`Table: ${table}`);
    if (data && data.length > 0) {
      console.log(Object.keys(data[0]));
    } else {
      console.log('No data or error:', error);
    }
  }
}

checkSchema();
