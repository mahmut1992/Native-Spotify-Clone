import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import {ProfileAPIOptions} from '../utils/apiOptions';

export const profileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [profile, setProfile] = useState(null);
  const [profLoading, setProfLoading] = useState(true);
  const [profError, setProfError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const options = ProfileAPIOptions;
        const response = await axios.request(options);
        setProfile(response.data);
      } catch (error) {
        setProfError(error);
      } finally {
        setProfLoading(false);
      }
    })();
  }, []);

  return (
    <profileContext.Provider value={{profile, profLoading, profError}}>
      {children}
    </profileContext.Provider>
  );
};
