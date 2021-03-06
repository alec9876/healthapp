import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  height: '60vh',
  width: '100vw'
};
class Eateries extends Component {
  constructor() {
    super();
    this.state = {
      eateries: [],
      markers: [],
      search: "",
      showingInfoWindow: false, //Hides or shows infoWindow
      activeMarker: {},         //Shows the active marker upon click
      selectedPlace: {}         //Shows the infoWindow to the selected place upon a marker
    }
  }

  // Shows infoWindow
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  // Closes infoWindow
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  // Enables Input typing
  onSearchChange = event => {
    this.setState({ search: event.target.value });
  }

  setMarkers = () => {
    const markers = []
    this.state.eateries.forEach(e => markers.push(e))
    this.setState({ markers })
  }

  async getGeocode(zip) {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=AIzaSyAxqOPqrq96MlpCU8LA6_dx6-gWtZcd68M`)
    const json = await res.json();
    return json.results[0].geometry;
  }

  // API Call
  async getEatery() {
    let geocode = await this.getGeocode(this.state.search)
    const headers = {
      'Content-type': 'application/json',
      'x-app-id': 'c060e6f7',
      'x-app-key': '7d88e5623346e2f4992628b5bcfac6c7'
    }
    console.log(geocode)
    const res = await fetch(`https://trackapi.nutritionix.com/v2/locations?north_east=${geocode.viewport.northeast.lat},${geocode.viewport.northeast.lng}&south_west=${geocode.viewport.southwest.lat},${geocode.viewport.southwest.lng}&limit=5`, {
      method: 'GET',
      headers: new Headers(headers)
    })
    const json = await res.json();
    this.setState({ eateries: json.locations }, () => this.setMarkers());
  }
 
 
  render() {
    const center = {lat: 38.2289, lng: -85.6654}
    const markerCenter = this.state.markers.length > 0 ? {lat: this.state.markers[0].lat, lng: this.state.markers[0].lng} : center 
    return (
      <div>
        <div className="div-map">
            <input className="eateries-input"
              placeholder="Enter 5-digit Zip Code"
              type="text"
              value={this.state.search}
              onChange={this.onSearchChange}
            /><br className="break" />{/* Displays on screens smaller than 452 px
               Button activates search for restaurants in map */}
            <button className="button-map-search" onClick={() => this.getEatery()}>
              Search
            </button>
        </div>
      <div>
      {/* Begin Google Maps Component */}
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={center}
          center={markerCenter}
          containerStyle={{height: '0', width: '0', marginTop: '0.3em'}}
        >
          {/* Displays initial center marker, and then other markers after query */}
          {this.state.markers && this.state.markers.map(m => (
            <Marker
              key={m.name}
              position={{
                lat: m.lat,
                lng: m.lng,
              }}
              onClick={this.onMarkerClick}
              name={m.name}
            />
          ))}
          <Marker
            onClick={this.onMarkerClick}
            name={this.selectedPlace}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
        </div>
      </div>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAxqOPqrq96MlpCU8LA6_dx6-gWtZcd68M'
})(Eateries);

