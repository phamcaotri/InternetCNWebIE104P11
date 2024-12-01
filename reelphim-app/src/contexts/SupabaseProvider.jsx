import React, { createContext, useContext } from 'react';
import supabase from '../config/supabaseclient.js';

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};
