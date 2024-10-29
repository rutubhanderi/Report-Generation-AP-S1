require('dotenv').config();    

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://nmkantbtewplhkokluuv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ta2FudGJ0ZXdwbGhrb2tsdXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNzM1NTcsImV4cCI6MjA0NTc0OTU1N30.X1tazzbvLVWts_7TTQjJJhfhBVgDllcl5aOt2NQ0ldQ';

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase