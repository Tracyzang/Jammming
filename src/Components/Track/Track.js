import React from 'react';
import './Track.css';

export class Track extends React.Component{
  constructor(props) {
    super(props);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
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
    <h3></h3>
    <p>| </p>
  </div>
  <a className="Track-action"></a>
</div>
    )
  }
};
