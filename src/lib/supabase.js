import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://mlumshgpyqidclpzxpsa.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdW1zaGdweXFpZGNscHp4cHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NTk1NTcsImV4cCI6MjA1NDEzNTU1N30.WMEXpy1j-MzgyTkskzRcO2LDeAIjG-ZaRepDBg9ET2o';
console.log(supabaseUrl, supabaseAnonKey);
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
