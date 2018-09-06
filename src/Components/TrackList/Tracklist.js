import React from 'react';
import './Tracklist.css';
import {Track} from '../Track/Track.js';

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
      {
        this.props.tracks.map(track => {
        return (
          <Track key={track.id}
        onAdd={this.props.onAdd}
        onRemove={this.props.onRemove}
        isRemoval={this.props.isRemoval}/>
      );
      })
      }
      {this.props.track.name}
      {this.props.track.artist}
      {this.props.track.album}
      </div>
    )
  }
};
