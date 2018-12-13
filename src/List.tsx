import * as React from "react";
import { connect } from "react-redux";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import { actions } from "src/redux/events/actions";
import { Typography, Fab, Paper, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Container from "./components/Container";
import { Event } from "./redux/events/types";
import { history } from "./App";
import { RootState } from "./redux";

interface MapProps {
    latitude: number;
    longitude: number;
    updateBound: (a: number, b: number, c: number, d: number) => void;
}

interface MapCoordProps {
    latitude: number;
    longitude: number;
}

class MyMap extends React.Component<MapProps> {
    map: GoogleMap | null;

    componentDidMount() {
        this.updateBound = this.updateBound.bind(this);
        this.updateBound();
    }

    updateBound() {
        if (this.map) {
            const bound = this.map.getBounds();
            if (bound) {
                const ne = bound.getNorthEast();
                const sw = bound.getSouthWest();
                this.props.updateBound(ne.lat(), sw.lat(), sw.lng(), ne.lng());
            }
        }
    }

    render() {
        return (
            <GoogleMap
                {...this.props}
                ref={map => {
                    this.map = map;
                }}
                defaultZoom={10}
                defaultCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
                defaultOptions={{
                    disableDefaultUI: true,
                }}
                onBoundsChanged={this.updateBound}
            />
        );
    }
}

const ConnectedMap = connect(
    undefined,
    dispatch => ({
        updateBound: (nlat: number, slat: number, elong: number, wlong: number) => {
            dispatch(actions.changeBox(nlat, slat, elong, wlong));
        },
    }),
)(MyMap);

const MyMapComponent = withScriptjs(withGoogleMap((props: MapCoordProps) => <ConnectedMap {...props} />));

interface State {
    isMarkerShown: boolean;
    haveLocation: boolean;
    latitude: number;
    longitude: number;
    showList: boolean;
    infoWindowId: string;
}

interface StateProps {
    events: Event[];
}
interface DispatchProps {}
interface OwnProps {}
interface Props extends StateProps, DispatchProps, OwnProps {}

// tslint:disable-next-line
class MyFancyComponent extends React.PureComponent<Props, State> {
    state: State = {
        isMarkerShown: false,
        haveLocation: false,
        latitude: -6.874466,
        longitude: 107.590251,
        showList: false,
        infoWindowId: "",
    };

    render() {
        const { events } = this.props;
        const { showList, latitude, longitude } = this.state;

        return (
            <Container>
                {showList ? (
                    <ListView
                        hideListView={() => this.setState({ showList: false })}
                        events={events}
                        onClickEvent={this.goToDiscussionRoom}
                    />
                ) : (
                    <div>
                        <ListViewToggle
                            totalEvents={events.length}
                            toggleListView={() => this.setState({ showList: true })}
                        />
                        <Fab
                            onClick={this.goToCreateEvent}
                            color="primary"
                            style={{ position: "fixed", bottom: 50, right: 0, zIndex: 1 }}
                        >
                            <Add />
                        </Fab>
                    </div>
                )}
                <MyMapComponent
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYz8shPIiqeSLBf_H8QwqEe4GoHjuMAzo&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: showList ? `40%` : `100%` }} />}
                    latitude={latitude}
                    longitude={longitude}
                >
                    {events.map(event => (
                        <Marker
                            key={event.id!}
                            position={{ lat: event.location.latitude, lng: event.location.longitude }}
                            onClick={() => this.setState({ infoWindowId: event.id! })}
                        >
                            {this.state.infoWindowId && this.state.infoWindowId === event.id! && (
                                <div>
                                    <InfoWindow onCloseClick={() => this.setState({ infoWindowId: "" })}>
                                        <div>
                                            <Typography variant="body1">{event.title}</Typography>
                                            <Typography variant="body2">{event.description}</Typography>
                                        </div>
                                    </InfoWindow>
                                </div>
                            )}
                        </Marker>
                    ))}
                </MyMapComponent>
            </Container>
        );
    }

    goToCreateEvent = () => {
        history.push("/create-event");
    };

    goToDiscussionRoom = (event: Event) => {
        history.push(`/events/${event.id!}`);
    };
}

function getEvents(state: RootState): Event[] {
    if (!state.events || !state.events.events) {
        return [];
    }
    return Object.keys(state.events.events).map(k => state.events.events[k]);
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>((state, ownProps) => ({
    events: getEvents(state),
}))(MyFancyComponent);

const ListView: React.SFC<{ hideListView: () => void; events: Event[]; onClickEvent: (event: Event) => void }> = ({
    hideListView,
    events,
    onClickEvent,
}) => {
    return (
        <Paper
            style={{
                backgroundColor: "white",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                height: "60%",
            }}
        >
            <Button variant="text" color="primary" style={{ marginBottom: 10 }} fullWidth onClick={hideListView}>
                Hide
            </Button>
            <div
                style={{
                    overflowX: "hidden",
                    overflowY: "auto",
                    height: "100%",
                }}
            >
                {events.map(event => (
                    <ListItem key={event.id!} event={event} onClickEvent={onClickEvent} />
                ))}
            </div>
        </Paper>
    );
};

const ListItem: React.SFC<{ event: Event; onClickEvent: (event: Event) => void }> = ({ event, onClickEvent }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                borderBottom: `1px solid #eee`,
                cursor: "pointer",
            }}
            onClick={() => onClickEvent(event)}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1">{event.title}</Typography>
                <Typography variant="body2">{event.location.detail}</Typography>
            </div>
            <Typography variant="body1">500m</Typography>
        </div>
    );
};

const ListViewToggle: React.SFC<{ toggleListView: () => void; totalEvents: number }> = props => {
    return (
        <Paper style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1 }}>
            <Button
                disabled={props.totalEvents === 0}
                variant="text"
                color="primary"
                fullWidth
                onClick={props.toggleListView}
            >
                {props.totalEvents > 0 ? `Show List (${props.totalEvents})` : "No results"}
            </Button>
        </Paper>
    );
};
