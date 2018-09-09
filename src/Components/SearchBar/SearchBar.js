import React from 'react';
import './SearchBar.css';


export class SearchBar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      term:''
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  //search method
  search() {
    this.props.onSearch(this.state.term);
  }

  //handleTermChange method
  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

//press enter triggers search 
  handleEnterKey(event) {
    if (event.keyCode === 13)
    this.search();
  }

  render() {
    return (
    <div className="SearchBar">
  <input placeholder="Enter A Song, Album, or Artist"
  onChange={this.handleTermChange}
  onKeyDown={this.handleEnterKey}/>
  <a onClick={this.search}>SEARCH</a>
</div>
)
  }
};
