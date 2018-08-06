import React, { Component } from 'react';
import './App.css';
import MyMap from './MyMap'
import superagent from 'superagent'

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      venues: [],
    }
  }

  componentDidMount(){
    const url = 'https://api.foursquare.com/v2/venues/search?v=20180806&ll=46.81228,-71.21454&client_id=W5B33OBMWMISIC0NDNCNS25RHTGUCCCBHKYVMZIQVBNHEXJW&client_secret=GIF3FZKN1JP0MMGCBMDKJCHTVDNHWSRDRIBDEGK2VC3AM1QX'

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

/*  componentWillUnmount() {
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
*/


  render() {
        const location = {
          lat: 46.81228,
          lng: -71.21454
        }

      return (

          <MyMap center={location} venues={this.state.venues}/>

      );
    }
}

export default App
