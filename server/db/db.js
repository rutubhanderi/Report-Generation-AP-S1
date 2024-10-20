const {createClient} = require('@supabase/supabase-js');

const supabase = createClient(
  'https://kagjqlowisznyfqvmlep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZ2pxbG93aXN6bnlmcXZtbGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxOTM4MzcsImV4cCI6MjA0NDc2OTgzN30.qN86M-39dmXJapv7T3I2db7seMym7pRKeVdhqZQqIKY'
);

module.exports = supabase

