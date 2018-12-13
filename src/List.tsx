import * as React from "react";
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import { actions } from "src/redux/events/actions";

import Filter from "./Filter";
import List from "./ListView";

interface MapProps {
	latitude: number;
  longitude: number;
  updateBound: (a: number, b: number, c: number, d: number) => void,
}

interface MapCoordProps {
	latitude: number;
  longitude: number;
}

class MyMap extends React.Component<MapProps> {
  map: GoogleMap |null

  componentDidMount() {
    this.updateBound = this.updateBound.bind(this);
    this.updateBound();
  }

  updateBound() {
    if(this.map) {
      const bound = this.map.getBounds();
      if (bound) {
        const ne = bound.getNorthEast();
        const sw = bound.getSouthWest();
        this.props.updateBound(ne.lat(), sw.lat(), sw.lng(), ne.lng());
      }
    }
  }

  render() {
    return 		<GoogleMap
    ref={(map) => { this.map = map; }}
    defaultZoom={16}
    defaultCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
    defaultOptions={{
      disableDefaultUI: true,
    }}
    onBoundsChanged={this.updateBound}
  />

  }
}

const ConnectedMap = connect(
  undefined,
  (dispatch) => ({
    updateBound: (nlat: number, slat: number, elong: number, wlong: number) => {
      dispatch(actions.changeBox(nlat, slat, elong, wlong));
    }
  }),
)(MyMap);

const MyMapComponent = withScriptjs(
	withGoogleMap((props: MapCoordProps) => (
    <ConnectedMap {...props} />
	)),
);

// tslint:disable-next-line
export default class MyFancyComponent extends React.PureComponent {
	state = {
		isMarkerShown: false,
		haveLocation: false,
		latitude: -6.874466,
		longitude: 107.590251,
	};

	componentDidMount() {
		this.delayedShowMarker();
		if ("geolocation" in navigator) {
			this.state.haveLocation = true;
			navigator.geolocation.getCurrentPosition(position => {
				// this.setState({
				//     latitude: position.coords.latitude,
				//     longitude: position.coords.longitude,
				// })
			});
		}
	}

	delayedShowMarker = () => {
		setTimeout(() => {
			this.setState({ isMarkerShown: true });
		}, 3000);
	};

	handleMarkerClick = () => {
		this.setState({ isMarkerShown: false });
		this.delayedShowMarker();
	};

	render() {
		return (
			<div style={{ height: "100%" }}>
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
