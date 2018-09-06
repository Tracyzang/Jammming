import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import {Spotify} from '../../util/Spotify.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults:{
        name:'',
        artist: '',
        album: '',
        id: ''
      },

      playlistName:'',

      playlistTracks:{
        name:'',
        artist:'',
        album:'',
        id:''
      }

    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }
//check to see if the track exists in the playlist, add if not
     addTrack(track) {
      if (this.state.playlistTracks.find(savedTrack =>
        savedTrack.id === track.id)) {
       return;
      } else {
      let newList = this.state.playlistTracks.slice();
      newList.push(track);
      this.setState({playlistTracks : newList});
    }
  }

  //removeTrack method
  removeTrack(track) {
    if (!this.state.playlistTracks.find(trackRemove =>
    trackRemove.id === track.id)) {
      return;
    } else {
      let newList = this.state.playlistTracks.filter(trackRemove =>
      trackRemove.id !== track.id);
      this.setState({playlistTracks : newList});

    }
  }

  //update playlist name
  updatePlaylistName(name) {
    this.setState({playlistName:name});
  }

  //savePlaylist method
  savePlaylist() {
    let playlistName = this.state.playlistName;
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => trackURIs.push(track.url));
  }

  //search method
  search(term) {
    console.log(term);

  }


  render() {
    return(
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist
      playlistName={this.state.playlistName}
      playlistTracks={this.state.playlistTracks}
      onRemove={this.removeTrack}
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}/>
      </div>
      </div>
      </div>
      );
    }
  }

export default App;
