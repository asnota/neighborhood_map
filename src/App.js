import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
import ListItems from './ListItems'
import superagent from 'superagent'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: [
        {
        "id": "1",
        "name": "1st Place",
        "title": "1st Place title",
        "lat": "37.768519",
        "lng": "-122.415640"
        },
        {
        "id": "2",
        "name": "2nd Place",
        "title": "2nd Place title",
        "lat": "37.778519",
        "lng": "-122.405640"
        },
        {
        "id": "3",
        "name": "3rd Place",
        "title": "3rd Place title",
        "lat": "37.759703",
        "lng": "-122.428093"
        }
    ]
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount(){
    const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll=37.768519,-122.405640&client_id=W5B33OBMWMISIC0NDNCNS25RHTGUCCCBHKYVMZIQVBNHEXJW&client_secret=GIF3FZKN1JP0MMGCBMDKJCHTVDNHWSRDRIBDEGK2VC3AM1QX'

    superagent
      .get(url)
      .query(null)
      .set('Accept', 'text/json')
      .end((error, response) => {

        const venues = response.body.response.venues
        console.log(JSON.stringify(venues))
        this.setState({
            venues: venues
        })
    })
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState(function(prevState){
      return  {
      selectedPlace: prevState.selectedPlace,
      activeMarker: marker,
      showingInfoWindow: true
      };
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {

        const markers = this.state.selectedPlace.map((venue, i) => {
        const marker = {
          position: {
            lat: venue.lat,
            lng: venue.lng
          }
        }
        return <Marker key={i} {...marker} onClick={this.onMarkerClick} />
      })

      return (
        <Map
          google = {this.props.google}
          onClick = {this.onMapClick}
          zoom = {14}
          >
          {markers}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace[0].name}</h1>
              </div>
          </InfoWindow>

          <ListItems venues={this.state.selectedPlace}/>

          <Search />
        </Map>

      );
    }


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB1ijS6t6OKocfsfAdu9Nuawo1NfwzJLHQ'
})(App)
