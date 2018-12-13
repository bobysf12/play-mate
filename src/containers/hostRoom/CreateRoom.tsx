import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import * as moment from "moment";
import { getLocation } from "src/helpers/location";
import { Event } from "src/redux/events/types";
import createLogger from "src/helpers/logger";
import { connect } from "react-redux";
import { RootState } from "src/redux";
import { createEvent } from "src/redux/events/actions";
import { history } from "src/App";

interface FormValues {
    title: string;
    description: string;
    startTime: moment.Moment;
    endTime: moment.Moment;
    location?: {
        lng: number;
        lat: number;
        detail: string;
    };
    maxPerson: number;
}
interface StateProps {
    isCreatingEvent: boolean;
}
interface DispatchProps {
    createEventRoom: (event: Event) => void;
}
interface OwnProps {}
interface Props extends StateProps, DispatchProps, OwnProps {}
interface State {
    formValues: FormValues;
    isFormValid?: boolean;
}

const logger = createLogger("CreateRoom");
const DATE_FORMAT: string = "YYYY-MM-DD";
const TIME_FORMAT: string = "HH:mm";
class CreateRoom extends React.Component<Props, State> {
    state: State = {
        formValues: {
            title: "",
            description: "",
            // @ts-ignore
            startTime: moment(),
            // @ts-ignore
            endTime: moment().add(1, "hour"),
            location: undefined,
            maxPerson: 10,
        },
    };

    componentDidMount() {
        getLocation(val => {
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    location: {
                        lat: val.coords.latitude,
                        lng: val.coords.longitude,
                        detail: "",
                    },
                },
            });
        });
    }

    render() {
        const { isCreatingEvent } = this.props;
        const { title, description, startTime, endTime, maxPerson } = this.state.formValues;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.goBack}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            Host a room
                        </Typography>
                    </Toolbar>
                </AppBar>
                <form>
                    <div style={{ padding: 10 }}>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Title"
                            fullWidth
                            value={title}
                            onChange={this.changeText("title")}
                        />
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Description"
                            multiline
                            fullWidth
                            rows={3}
                            value={description}
                            onChange={this.changeText("description")}
                        />
                        <TextField
                            label="Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={startTime.format(DATE_FORMAT)}
                            fullWidth
                            onChange={this.changeTime("startTime")}
                        />
                        <TextField
                            label="start time"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={startTime.format(TIME_FORMAT)}
                            onChange={this.changeTime("startTime")}
                            fullWidth
                        />
                        <TextField
                            label="end time"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            value={endTime.format(TIME_FORMAT)}
                            onChange={this.changeTime("endTime")}
                            fullWidth
                        />
                        {/* TODO: Open map to get longitude latitude and address */}
                        {/* <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="location"
                            type="text"
                            fullWidth
                            multiline
                            rows={3}
                            value={location && location.detail}
                        /> */}
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            type="number"
                            label="Max person"
                            fullWidth
                            value={maxPerson}
                            onChange={this.changeText("maxPerson")}
                        />
                    </div>
                    <Button
                        disabled={isCreatingEvent}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.createRoom}
                    >
                        Create
                    </Button>
                </form>
            </div>
        );
    }

    changeText = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            formValues: {
                ...this.state.formValues,
                [name]: e.currentTarget.value,
            },
        });
    };

    changeDate = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.currentTarget;
        // @ts-ignore
        const momentObj: moment.Moment = moment(value, DATE_FORMAT);

        this.setState({
            formValues: {
                ...this.state.formValues,
                [name]: momentObj,
            },
        });
    };

    changeTime = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.currentTarget;
        logger.debug(value);
        const { startTime } = this.state.formValues;
        // @ts-ignore
        const momentObj: moment.Moment = moment(
            `${startTime.format(DATE_FORMAT)} ${value}`,
            `${DATE_FORMAT} ${TIME_FORMAT}`,
        );

        this.setState({
            formValues: {
                ...this.state.formValues,
                [name]: momentObj,
            },
        });
    };

    createRoom = () => {
        // tslint:disable-next-line
        logger.debug(this.state.formValues);
        const inValidForm: boolean = Object.keys(this.state.formValues)
            .map(k => this.state.formValues[k])
            .some(value => !value);

        if (inValidForm) {
            alert("Please fill all fields!");
            return;
        }

        const { createEventRoom } = this.props;
        const { title, description, startTime, endTime, location, maxPerson } = this.state.formValues;

        const event: Event = {
            title,
            description,
            start_time: startTime.toDate(),
            end_time: endTime.toDate(),
            max_person: maxPerson,
            location: {
                latitude: randomIntFromInterval(-6.874, -6.89),
                longitude: randomIntFromInterval(107.59, 107.7),
                detail: location!.detail,
            },
        };

        createEventRoom(event);
    };

    goBack = () => {
        history.goBack();
    };
}
function randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.random() * (max - min) + min;
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    (state, ownProps) => ({
        isCreatingEvent: state.events.isCreatingEvent,
    }),
    {
        createEventRoom: createEvent,
    },
)(CreateRoom);
