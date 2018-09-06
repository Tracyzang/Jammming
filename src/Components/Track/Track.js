import React from 'react';
import './Track.css';

export class Track extends React.Component{
  constructor(props) {
    super(props);

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.renderAction=this.renderAction.bind(this);
  }
  renderAction() {
    if(this.props.isRemoval){
      return <a className='Track-action' onClick={this.removeTrack}>-</a>
    }else{
      return <a className='Track-action' onClick={this.addTrack}>+</a>
    }
  }

  addTrack(track) {
    this.props.onAdd(this.props.track)
  }

  //removeTrack method
  removeTrack(track) {
    this.props.onRemove(this.props.track)
  }

  render() {
    return (
      <div className="Track">
  <div className="Track-information">
    <h3>{this.props.track.name}</h3>
    <p>{this.props.track.artist}</p>
    <div className="Track-audio" >
      <audio controls>
      <source src={this.props.track.preview_url} type="audio/mpeg" />
              </audio>
            </div>
          </div>
          {this.renderAction()}
        </div>
      );
    }
  };
