import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompletely.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Replace with your key

export const supabase = createClient(supabaseUrl, supabaseKey);