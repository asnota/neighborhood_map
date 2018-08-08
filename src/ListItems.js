import React, { Component } from "react";
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListItems extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  onListItemClick = (props, marker, e) => {
    this.setState(
      {
        venues: this.props.venues,
        marker: this.props.marker
      }
    );

    const iteration = this.props.venues.map(venue => {
      if(venue.name === this.props.marker.name){
        this.props.marker.setAnimation(window.google.maps.Animation.BOUNCE);
        venue.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      })

    return iteration
    }


  render(){

    const { venues } = this.props
    const { query } = this.state

    let showingVenues
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingVenues = venues.filter((venue) => match.test(venue.name))
    } else {
      showingVenues = venues
    }
    showingVenues.sort(sortBy('name'))

    const list = showingVenues.map((venue) => {
      return (
          <li
            key={venue.id}
            onClick={this.onListItemClick}
          >
            {venue.name}
          </li>
        )

    })

    return(
      <div>
        <div className="search-places">
          <div className="search-places-bar">
            <div className="search-places-input-wrapper">
              <input
                role="search"
                aria-labelledby="filter"
                type='text'
                placeholder='Search places'
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
        </div>

        {showingVenues.length !== venues.length && (
          <div className='showing-venues'>
            <span>Now showing {showingVenues.length} of {venues.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol
          tabIndex="0"
          aria-label="List of concert halls"
          className="theList"
          >
          {list}
        </ol>
      </div>

    );
  }

};

export default ListItems
