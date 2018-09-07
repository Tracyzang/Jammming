
const clientID = 'be5b3014440045a19cd3dc0c869245bc';
const redirectURI = 'https://polite-pest.surge.sh';
const searchBase = 'https://api.spotify.com/v1/';
const accessBase = 'https://accounts.spotify.com/authorize';

let token;

export const Spotify = {
  getAccessToken() {
    if(token) {
      return token;
    }
    const URLToken = window.location.href.match(/access_token=([^&]*)/);
    const tokenExpiration = window.location.href.match(/expires_in=([^&]*)/);
    if (URLToken && tokenExpiration) {
      token = URLToken[1];
      const expires = Number(tokenExpiration[1]);
      window.setTimeout(()=> token = '', expires * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
    } else {
      const accessURL = `${accessBase}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
  search(term) {
    let token = Spotify.getAccessToken();
    return fetch(`${searchBase}search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
        if(!jsonResponse.tracks){
        return [];
      }
      return jsonResponse.tracks.items.map( track => ({
        id: track.id,
        name : track.name,
        artist: track.artists[0].name, // first artist if array returned
        album: track.album.name,
        uri: track.uri
      }))
    })
  },
  savePlaylist(name, trackUris) {
    if (!name || !trackUris || trackUris.length === 0) return;
    const searchURL = searchBase + 'me';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    let userID;
    let playlistID;
    fetch(searchURL, {
      headers: headers
    })
    .then(response => response.json())
    .then(jsonResponse => userID = jsonResponse.id)
    .then(() => {
      const createPlaylistUrl = `${searchBase}users/${userID}/playlists`;
      fetch(createPlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: name
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playlistID = jsonResponse.id)
        .then(() => {
          const addPlaylistTracksUrl = `${searchBase}users/${userID}/playlists/${playlistID}/tracks`;
          fetch(addPlaylistTracksUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackUris
            })
          });
        })
    })
  }
};
