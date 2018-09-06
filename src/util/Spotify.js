const client_id = 'be5b3014440045a19cd3dc0c869245bc';
const redirect_uri = 'http://localhost:3000/';
let accessToken = '';
let response_type ='token';


export const Spotify = {

  getAccessToken() {
  if (accessToken) {
    return accessToken;
  } else if (window.location.href.match(/access_token=([^&]*)/) &&
             window.location.href.match(/expires_in=([^&]*)/) &&
             window.location.href.match(/token_type=([^&]*)/)) {
    let access_token_array = window.location.href.match(/access_token=([^&]*)/);
    let expires_in_array = window.location.href.match(/expires_in=([^&]*)/);

  //  console.log(access_token_array, expires_in);
    accessToken = access_token_array[1];
    const expires_in = Number(expires_in_array[1]);

    window.setTimeout(() => accessToken = '', expires_in * 1000);
    window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      const endpoint = `client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`
      window.location = endpoint;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    const getTrackEndpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const header = { headers: { Authorization: `Bearer ${accessToken}` } };

    return fetch(getTrackEndpoint, header
      ).then(response => {
        if (response.ok) {
          return response.json();
        } throw new Error ('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(searchJsonResponse => {
        if (!searchJsonResponse.tracks) {
          return [];
        }
        return searchJsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        album: track.album.name,
                        artist: track.artists[0].name,
                        name:track.name,
                        uri: track.uri,
                        preview_url: track.preview_url

          }));
        }
      )
    },


    savePlaylist(playlistName, trackURIs) {
      console.log(playlistName, trackURIs)
      if (!playlistName || !trackURIs) return;
      const accessToken = this.getAccessToken();
      const authHeader = {Authorization: `Bearer ${accessToken}`, 'Content-Type': `application/json` };
      const createPlaylistHeader = {
          headers: authHeader,
          method: `Post`,
          body: JSON.stringify({name: playlistName})
      };
      const popPlaylistHeader = {
        headers: authHeader,
        method: `Post`,
        body: JSON.stringify({uris: trackURIs})
      }

      let user_id,playlist_id;

    return fetch(`https://api.spotify.com/v1/me`, {headers: authHeader}
        ).then(response => {
          if (response.ok) {
            return response.json();
            } throw new Error ('Request failed!');
          }, networkError => {
            console.log(networkError.message);
          }).then(userIdJsonResponse => {
           if (userIdJsonResponse.id)
              console.log(`response.id is ${userIdJsonResponse.id}`)
              user_id = userIdJsonResponse.id;
              console.log(`userID is ${user_id}`);

            return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, createPlaylistHeader
                ).then(response => {
                  if (response.ok) {
                    return response.json();
                  } throw new Error ('Request failed!');
                }, networkError => {
                  console.log(networkError.message);
                }).then(playlistIdJsonResponse => {
                  if (playlistIdJsonResponse.id)
                    playlist_id = playlistIdJsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, popPlaylistHeader)
                })
          })
    }
};
