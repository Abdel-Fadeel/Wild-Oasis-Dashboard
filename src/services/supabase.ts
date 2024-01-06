import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://dsksixzoaflziwjatbne.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRza3NpeHpvYWZseml3amF0Ym5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5NDE1OTksImV4cCI6MjAxOTUxNzU5OX0.pGqTtMsZfMeAHrjgtQ2FQWwina6en9gY5jV6wpO8SgE';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
