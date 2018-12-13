import * as React from "react";
import { IconButton, Paper, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { ArrowBack, Send } from "@material-ui/icons";
import { Comment } from "src/redux/comments/types";
import { Event } from "src/redux/events/types";
import moment from "moment";
import { RootState } from "src/redux";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { getEventComments } from "src/redux/comments/selectors";
import { addComment, loadComments } from "src/redux/comments/actions";
import createLogger from "src/helpers/logger";
import { history } from "src/App";

interface StateProps {
    event: Event;
    comments: Comment[];
    isCreatingComment?: boolean;
    isLoadingComments?: boolean;
    isEventOwner: boolean;
}
interface DispatchProps {
    sendComment: (eventId: string, text: string) => void;
    loadComments: (eventId: string) => void;
}
interface OwnProps extends RouteComponentProps<{ id: string }> {}
interface Props extends StateProps, DispatchProps, OwnProps {}

interface State {
    commentText: string;
}

const logger = createLogger("DiscussionRoom");
class DiscussionRoom extends React.Component<Props, State> {
    state: State = {
        commentText: "",
    };

    componentDidMount() {
        if (!this.props.event) {
            logger.warn("Event not found! Redirecting..");
            this.props.history.push("/events");
            return;
        }
        this.props.loadComments(this.props.match.params.id);
    }

    render() {
        const { comments, event, isEventOwner } = this.props;

        if (!event) {
            return null;
        }

        const { commentText } = this.state;
        const { title, description } = event;
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.goBack}>
                            <ArrowBack />
                        </IconButton>
                        <Typography
                            style={{
                                flexGrow: 1,
                            }}
                            variant="title"
                            color="inherit"
                        >
                            {title}
                        </Typography>
                        {isEventOwner ? (
                            <Button color="inherit" onClick={this.closeEvent}>
                                Close
                            </Button>
                        ) : (
                            <Button color="inherit" onClick={this.closeEvent}>
                                Join
                            </Button>
                        )}
                    </Toolbar>

                    <Description description={description} />
                </AppBar>
                <div style={{ overflowY: "auto", overflowX: "hidden", flex: 1, marginTop: 110, marginBottom: 60 }}>
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
                <CommentInput value={commentText} onChangeText={this.changeComment} onSendClick={this.sendComment} />
            </div>
        );
    }

    changeComment = (value: string) => this.setState({ commentText: value });

    sendComment = () => {
        const { sendComment, event } = this.props;
        const { commentText } = this.state;
        sendComment(event.id!, commentText);
        this.setState({ commentText: "" });
    };

    goBack = () => {
        history.push("/events");
    };

    closeEvent = () => {
        logger.warn("Implement close event");
    };

    joinEvent = () => {
        logger.warn("Implement join event");
    };
}

const Description: React.SFC<{ description: string }> = ({ description }) => {
    return (
        <div
            style={{
                height: 40,
                backgroundColor: "black",
                opacity: 0.8,
                // position: "fixed",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflowY: "hidden",
                overflowX: "auto",
            }}
        >
            <Typography variant="body1" style={{ color: "white", padding: "5px 10px" }}>
                {description}
            </Typography>
        </div>
    );
};

const Comment: React.SFC<{
    comment: Comment;
}> = props => {
    const { comment } = props;
    const headerStyle: any = { fontSize: 10, color: "grey" };
    return (
        <Paper style={{ margin: "5px", padding: 10 }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 5,
                }}
            >
                {/* FIXME: add User to props */}
                <Typography style={headerStyle} variant="body1">
                    {comment.user!.username}
                </Typography>
                <Typography style={headerStyle} variant="body1">
                    {// @ts-ignore
                    moment(comment.created_at).format("HH:mm")}
                </Typography>
            </div>
            <Typography paragraph style={{ whiteSpace: "pre-line" }}>
                {comment.text}
            </Typography>
        </Paper>
    );
};

const CommentInput: React.SFC<{
    value: string;
    onChangeText: (value: string) => any;
    onSendClick: () => any;
}> = props => {
    const { value, onChangeText, onSendClick } = props;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                backgroundColor: "#eee",
                padding: 5,
                position: "fixed",
                bottom: 0,
                right: 0,
                left: 0,
            }}
        >
            <textarea
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 25,
                    height: 25,
                    padding: `10px 20px`,
                    fontSize: 12,
                    fontFamily: "Roboto",
                }}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeText(e.currentTarget.value)}
            />
            <IconButton onClick={onSendClick}>
                <Send />
            </IconButton>
        </div>
    );
};

function getEvent(state: RootState, ownProps: OwnProps): Event {
    const eventId: string = ownProps.match.params.id;
    const event: Event = state.events.events[eventId];
    return event;
}

function getComments(state: RootState, ownProps: OwnProps): Comment[] {
    const event: Event = getEvent(state, ownProps);
    if (!event) {
        return [];
    }
    return getEventComments(event.id!)(state);
}

function getIsEventOwner(state: RootState, ownProps: OwnProps): boolean {
    const event = getEvent(state, ownProps);

    if (!event || !state.auth.loggedInUserId) {
        return false;
    }

    if (state.auth.loggedInUserId! === event.creator_id!) {
        return true;
    }
    return false;
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    (state, ownProps) => ({
        event: getEvent(state, ownProps),
        comments: getComments(state, ownProps),
        isEventOwner: getIsEventOwner(state, ownProps),
    }),
    {
        sendComment: addComment,
        loadComments,
    },
)(DiscussionRoom);
