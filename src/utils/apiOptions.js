export const AlbumAPIOptions = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: 'Türkiyede popüler',
    type: 'albums',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5',
  },
  headers: {
    'x-rapidapi-key': '495e1d699fmshde1c47836a418bcp104d4fjsnfb5adb65e69c',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  },
};

export const ArtistAPIOptios = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: 'türkiyede popüler olanlar',
    type: 'artist',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5',
  },
  headers: {
    'x-rapidapi-key': '495e1d699fmshde1c47836a418bcp104d4fjsnfb5adb65e69c',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  },
};

export const ProfileAPIOptions = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/user_profile/',
  params: {
    id: 'nocopyrightsounds',
    playlistLimit: '10',
    artistLimit: '10',
  },
  headers: {
    'x-rapidapi-key': '495e1d699fmshde1c47836a418bcp104d4fjsnfb5adb65e69c',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  },
};

export const SearchAPIOptions = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/search',
  params: {
    term: 'kiss the rain',
    locale: 'tr-TR',
    offset: '0',
    limit: '5',
  },
  headers: {
    'x-rapidapi-key': '495e1d699fmshde1c47836a418bcp104d4fjsnfb5adb65e69c',
    'x-rapidapi-host': 'shazam.p.rapidapi.com',
  },
};
