import 'react-native-url-polyfill/auto'

import { createClient}  from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SUPABASE_URL, SUPABASE_KEY_ANON } from "@env";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY_ANON,{
  auth:{
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
})
