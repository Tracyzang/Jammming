const client_id = 'be5b3014440045a19cd3dc0c869245bc';
const redirect_uri = 'http://localhost:3000/';
let accessToken = '';
let expires_in = '';

const Spotify = {
  //check if user has logged into Spotify account
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
  }

  const url = window.location.href;
  if(url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
            const regexFound1 = url.match(/access_token=([^&]*)/);
            const regexFound2 = url.match(/expires_in=([^&]*)/);
            accessToken = regexFound1[1];
            expiresIn = regexFound2[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken;
          } else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
          },


          //search Spotify liabiary
          search(term) {
            accessToken = Spotify.getAccessToken();
            return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
              headers: {Authorization: `Bearer ${accessToken}`}
            }).then(response => {
              if(response.ok) {
                return response.json();
              }
            }).then(jsonResponse => {
              if(jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track =>({
                  id: track.id,
                  name:track.name,
                  artist: track.artists[0].name,
                  album: track.album.name,
                  uri:track.uri
                }));
              }
            });
          },
        }



export default Spotify;
