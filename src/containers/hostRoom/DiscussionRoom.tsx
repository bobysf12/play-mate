import * as React from "react";
import { IconButton, Paper, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { ArrowBack, Send } from "@material-ui/icons";
import { Comment } from "src/redux/comments/types";
import { Event } from "src/redux/events/types";
import * as moment from "moment";

interface StateProps {
	event: Event;
	comments: Comment[];
	isCreatingComment: boolean;
	isLoadingComments: boolean;
}
interface DispatchProps {
	sendComment: (eventId: string, text: string) => void;
}
interface OwnProps {}
interface Props extends StateProps, DispatchProps, OwnProps {}

interface State {
	commentText: string;
}

class DiscussionRoom extends React.Component<Props, State> {
	state: State = {
		commentText: "",
	};

	render() {
		const { comments, event } = this.props;
		const { commentText } = this.state;
		const { title, description } = event;
		return (
			<div>
				<AppBar position="fixed">
					<Toolbar>
						<IconButton color="inherit">
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
						<Button color="inherit">Join</Button>
					</Toolbar>

					<Description description={description} />
				</AppBar>
				<div style={{ overflowY: "auto", overflowX: "hidden", flex: 1, marginTop: 110, marginBottom: 60 }}>
					{comments.map(comment => (
						<Comment key={comment.id} comment={comment} />
					))}
				</div>
				<CommentInput value={commentText} onChangeText={this.changeComment} />
			</div>
		);
	}

	changeComment = (value: string) => this.setState({ commentText: value });

	sendComment = () => {
		const { sendComment, event } = this.props;
		const { commentText } = this.state;
		sendComment(event.id!, commentText);
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
	return (
		<Paper style={{ margin: "5px", padding: 10 }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				{/* FIXME: add User to props */}
				<Typography variant="body1">Name</Typography>
				<Typography variant="body1">{moment(comment.created_at).format("HH:mm")}</Typography>
			</div>
			<Typography paragraph>{comment.text}</Typography>
		</Paper>
	);
};

const CommentInput: React.SFC<{
	value: string;
	onChangeText: (value: string) => any;
}> = props => {
	const { value, onChangeText } = props;
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
				}}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeText(e.currentTarget.value)}
			/>
			<IconButton>
				<Send />
			</IconButton>
		</div>
	);
};

export default DiscussionRoom;
