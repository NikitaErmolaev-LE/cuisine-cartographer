
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tqixxxaowvyzgkxmyarn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxaXh4eGFvd3Z5emdreG15YXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDQwODAsImV4cCI6MjA1NjU4MDA4MH0.KRF6qR25c-NO0K5e0ZqDWshofIA52Eh26YR5givqAzI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
