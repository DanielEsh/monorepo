import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qrzbgtwjacliglfbzdsc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyemJndHdqYWNsaWdsZmJ6ZHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMDk5NTIsImV4cCI6MjA2OTU4NTk1Mn0.2PKbixMdhmrVwjc93KqAz3B_qhG-IUxCW5QJO9OOS0Y';

export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey);