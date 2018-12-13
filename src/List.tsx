import * as React from "react";
// import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import Filter from './Filter';
import List from './ListView';

interface MapProps {
    latitude: number;
    longitude: number;
}

const MyMapComponent = withScriptjs(withGoogleMap((props: MapProps) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    defaultOptions={{
        disableDefaultUI: true,
    }}
    />
));

export default class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    haveLocation: false,
    latitude: -6.874466,
    longitude: 107.590251,
  }

  componentDidMount() {
    this.delayedShowMarker();
    if ("geolocation" in navigator) {
        this.state.haveLocation = true;
        navigator.geolocation.getCurrentPosition((position) => {
            // this.setState({
            //     latitude: position.coords.latitude,
            //     longitude: position.coords.longitude,
            // })
        });
    }
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
        <div style={{height: '100%'}}>
        <Filter />
        <List />
      <MyMapComponent
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYz8shPIiqeSLBf_H8QwqEe4GoHjuMAzo&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      latitude={this.state.latitude}
      longitude={this.state.longitude}
      />
        </div>
    );
  }
}