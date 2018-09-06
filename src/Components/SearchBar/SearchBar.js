import React from 'react';
import './SearchBar.css';


export class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  //search method
  search() {
    this.props.onSearch(this.state.term);
  }

  //handleTermChange method
  handleTermChange(event) {
    this.state = event.target.value;
  }

  render() {
    return (
    <div className="SearchBar">
  <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
  <a>SEARCH</a>
</div>
)
  }
};
