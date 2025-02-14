import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://lubrlpiuzxviwumzymxh.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1YnJscGl1enh2aXd1bXp5bXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1Mjk2MTAsImV4cCI6MjA1NTEwNTYxMH0.fOMHGSoXQO7cUk0hqn6FCeD1u2z1toNS3J3d28YSYg4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
