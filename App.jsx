import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { supabase } from './src/lib/supabase';
import Account from './src/screens/Account';
import Auth from './src/screens/Auth';
import AppNavigator from './src/routes/AppNavigator';

export default function App() {
  console.log(process.env.REACT_NATIVE_SUPABASE_URL, "sds");
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <AppNavigator />;
}
