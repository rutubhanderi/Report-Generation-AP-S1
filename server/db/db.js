require('dotenv').config();   // to access the API key from .env file 

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL // add your project URL in .env file
const supabaseKey = process.env.SUPABASE_KEY  // add your project API key in .env file
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase