// AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import { retrieveData, storeData } from './kv-store';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [approved, setApp] = useState([]);

  useEffect(() => {
    
        const fetchapp = async () => {
            const storedapp = await retrieveData('userNotifications');
            if (storedapp) {
              setApp(storedapp);
            }
          };
      
          fetchapp()
    
    
  }, []);
 

  return (
    <AppContext.Provider
      value={{
        approved
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
