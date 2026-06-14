import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mvvjwguhamylsizcqvwv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dmp3Z3VoYW15bHNpemNxdnd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTYzOTIsImV4cCI6MjA5NjU5MjM5Mn0.Qp6ojfpdYOVBh97uGqW0PT5BAOrk_R50u8Z5msWPIms";
const supabase = createClient(supabaseUrl, supabaseKey);

//manually exporting variable = supabase for app.jsx to use
export default supabase;
