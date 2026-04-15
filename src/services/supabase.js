import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://leytgavsbpecdbxnjvuq.supabase.co";
const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleXRnYXZzYnBlY2RieG5qdnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyODc3NjEsImV4cCI6MjA4OTg2Mzc2MX0.sczGN9_0QTdva-FfqlN8fqE3CaRznH90-3QPhAUIujQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


// export const supabaseUrl = 'https://leytgavsbpecdbxnjvuq.supabase.co';

// export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleXRnYXZzYnBlY2RieG5qdnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyODc3NjEsImV4cCI6MjA4OTg2Mzc2MX0.sczGN9_0QTdva-FfqlN8fqE3CaRznH90-3QPhAUIujQ';

