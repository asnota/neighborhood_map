import React, { Component } from 'react';


class Search extends Component{

  state = {
    query: '',
  }

  updateQuery = (event) => {
    const query = event.target.value
    this.setState({ query: query })
    if (query) {
      //to do
    } else {
      //this.setState({})
    }
  }

  render(){

    return(
      <div className="search-places">
        <div className="search-places-bar">
          <div className="search-places-input-wrapper">
            <input
              type='text'
              placeholder='Search places'
              value={ this.state.query }
              onChange={ this.updateQuery }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Search
