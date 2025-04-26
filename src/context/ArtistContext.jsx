import {createContext, useEffect, useState} from 'react';
import {ArtistAPIOptios} from '../utils/apiOptions';
import axios from 'axios';

export const ArtistContext = createContext();

export const ArtistProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [artLoading, setArtLoading] = useState(true);
  const [artError, setArtError] = useState(null);

  useEffect(() => {
    // IIFE (anında çalışan fonksiyon)
    (async () => {
      const options = ArtistAPIOptios;

      try {
        const response = await axios.request(options);
        const data = response.data.artists.items;
        setArtists(data);
      } catch (error) {
        setArtError(error.message);
      } finally {
        setArtLoading(false);
      }
    })();
  }, []);

  return (
    <ArtistContext.Provider value={{artists, artLoading, artError}}>
      {children}
    </ArtistContext.Provider>
  );
};
