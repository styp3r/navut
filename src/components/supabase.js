// yourSupabaseConfiguration.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbfhmugkjiiwrlavunae.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZmhtdWdramlpd3JsYXZ1bmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwOTcyMTUsImV4cCI6MjAyMTY3MzIxNX0.I6jAJI-1M_VUpbvcVhOxiWA4_gVuTvIdg4KMT8yn3MU';

export const supabase = createClient(supabaseUrl, supabaseKey);
