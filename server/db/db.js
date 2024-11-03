require('dotenv').config();    

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://fvgktzbhhumqwyjwylqf.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2t0emJoaHVtcXd5and5bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NDkzNTksImV4cCI6MjA0NjIyNTM1OX0.40Ee4bWx_y3yi8oD4QY6PDs4qpOYcB_OLmtyYAC4Ge0';

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase