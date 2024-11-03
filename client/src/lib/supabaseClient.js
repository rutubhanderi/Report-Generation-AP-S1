// client/src/lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nmkantbtewplhkokluuv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ta2FudGJ0ZXdwbGhrb2tsdXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNzM1NTcsImV4cCI6MjA0NTc0OTU1N30.X1tazzbvLVWts_7TTQjJJhfhBVgDllcl5aOt2NQ0ldQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;