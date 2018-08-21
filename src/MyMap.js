import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

export class MyMap extends React.Component {
    constructor(props) {
      super(props);
      this.mark = React.createRef();

      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        activeItem: {},
        mark: '',
        query: ''
      }
      this.updateQuery = this.updateQuery.bind(this);
      this.clearQuery = this.clearQuery.bind(this);
    }

    updateQuery = (query) => {
      this.setState({ query: query.trim() })
    }

    clearQuery = () => {
      this.setState({ query: '' })
    }

    onMarkerClick = (props, marker, e) => {
      this.setState(
        {
          venues: this.props.venues,
          activeMarker: marker,
          showingInfoWindow: true
        }
      );
    }

    onMapClick = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
        })
      }
    };

  /*  onListItemClick = (props, e) => {
      this.setState(
          {
            activeItem: this.props.venues,
      //    mark: this.mark.current
      //    mark: this.ref.marker + this.marker.id
          }
      );
    }
*/

    onListItemClick = () => {
		  const myMarkersNodesList = document.querySelectorAll('map area'); // Returns a NodeList
      const myMarkersArray = [...myMarkersNodesList]; // Converts to an Array Object
      const myLiArray = document.getElementsByTagName('li'); //Retunds a HTMLCollection

      if (myLiArray.length !== 0) {
        for(let i = 0; i < myLiArray.length; i++){
            myLiArray[i].addEventListener("click", function(e){
              let foundMarker = myMarkersArray.find(marker => marker.getAttribute('title') === myLiArray[i].getAttribute('name'))
              foundMarker.click();
            });
          }
        }
      }


  render(){

    const { venues } = this.props
    const { query } = this.state

//Storing the result of query in showingVenues in order to map over in markers and items
    let showingVenues
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingVenues = venues.filter((venue) => match.test(venue.name))
    } else {
      showingVenues = venues
    }
    showingVenues.sort(sortBy('name'))


    const markers = showingVenues.map((venue) => {
      const marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        },
      //  animation: window.google.maps.Animation.DROP
        }
      return <Marker
              key={venue.id}
              id={venue.id}
              {...marker}
              ref={this.mark.current}
              updateQuery={this.updateQuery}
              onClick={this.onMarkerClick.bind(this)}
              name={venue.name}
              title={venue.name}
              address={venue.location.address}
              animation={this.state.activeMarker ? (venue.name === this.state.activeMarker.title ? '1' : '0') : '0'}
              />
    })

    const list = showingVenues.map((venue) => {
      return (
          <li
            key={venue.id}
            id={venue.id}
            name={venue.name}
            title={venue.name}
            address={venue.location.address}
            onClick={this.onListItemClick.bind(this)}
            tabIndex={'0'}
          >
            {venue.name}
          </li>
        )
    })

    return(
      <Map
        google = {this.props.google}
        center = {this.props.center}
        zoom = {13}
        onClick={this.onMapClick.bind(this)}
        >
        {markers}

        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
          <div>
            <h3 tabIndex={'0'}>{this.state.activeMarker.title}</h3>
            <h4 tabIndex={'0'}>{this.state.activeMarker.address}</h4>
            <img src={require('./powered-by-foursquare-blue.png')} width="150" height="15" alt="Powered by Foursquare"/>
          </div>
        </InfoWindow>

        {showingVenues.length !== venues.length && (
          <div className='showing-venues'>
            <span>Now showing {showingVenues.length} of {venues.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

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

        <ol
          tabIndex="0"
          aria-label="List of concert halls"
          className="theList"
          >
          {list}
        </ol>
      </Map>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyB1ijS6t6OKocfsfAdu9Nuawo1NfwzJLHQ'
})(MyMap)
