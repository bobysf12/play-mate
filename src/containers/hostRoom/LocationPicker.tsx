import * as React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Container from "src/components/Container";
import { getLocation } from "src/helpers/location";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
// import createLogger from "src/helpers/logger";

interface Props {
    onClickMap: (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => void;
}
interface State {
    latitude?: number;
    longitude?: number;
}
const MyMapComponent = withScriptjs(
    withGoogleMap((props: Props) => (
        <GoogleMap
            {...props}
            options={{
                disableDoubleClickZoom: true,
                scrollwheel: false,
                disableDefaultUI: true,
                zoomControl: true,
            }}
            onClick={props.onClickMap}
            defaultZoom={16}
            defaultCenter={{ lat: -6.874466, lng: 107.590251 }}
        />
    )),
);

// const logger = createLogger("LocationPicker");
class LocationPicker extends React.Component<Props, State> {
    map: GoogleMap | null;

    state: State = {
        longitude: undefined,
        latitude: undefined,
    };

    componentDidMount() {
        getLocation(cb => {
            const { latitude, longitude } = cb.coords;
            this.setState({ latitude, longitude });
        });
    }

    render() {
        const { longitude, latitude } = this.state;
        if (!latitude || !longitude) {
            return null;
        }
        return (
            <Container>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            style={{
                                flexGrow: 1,
                            }}
                            variant="title"
                            color="inherit"
                        >
                            Pick location
                        </Typography>
                        <Button color="inherit">Save</Button>
                    </Toolbar>
                </AppBar>
                <MyMapComponent
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYz8shPIiqeSLBf_H8QwqEe4GoHjuMAzo&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onClickMap={this.setMarkerPosition}
                >
                    <Marker position={{ lng: longitude!, lat: latitude! }} />
                </MyMapComponent>
            </Container>
        );
    }

    setMarkerPosition = (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => {
        const { lat, lng } = e.latLng;

        this.setState({
            latitude: lat(),
            longitude: lng(),
        });
    };
}

export default LocationPicker;
