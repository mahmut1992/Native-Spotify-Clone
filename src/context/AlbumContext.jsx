import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import {AlbumAPIOptions} from '../utils/apiOptions';

export const AlbumContext = createContext();

export const AlbumProvider = ({children}) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    const options = AlbumAPIOptions;
    try {
      const response = await axios.request(options);

      const albumItems = response.data?.albums?.items?.map(item => ({
        uri: item.data.uri,
        name: item.data.name,
        year: item.data.date.year,
        artist: item.data.artists.items[0].profile.name,
        coverArt: item.data.coverArt.sources[0].url,
      }));
      setAlbums(albumItems);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <AlbumContext.Provider value={{albums, loading, error}}>
      {children}
    </AlbumContext.Provider>
  );
};
