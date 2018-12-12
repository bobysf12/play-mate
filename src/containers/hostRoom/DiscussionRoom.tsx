import * as React from "react";
import { IconButton, Paper, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { ArrowBack, Send } from "@material-ui/icons";

interface Props {}

class DiscussionRoom extends React.Component<Props> {
	render() {
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
							Room #ID - 7 / 12
						</Typography>
						<Button color="inherit">Join</Button>
					</Toolbar>

					<Description description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
				</AppBar>
				<div style={{ overflowY: "auto", overflowX: "hidden", flex: 1, marginTop: 110, marginBottom: 60 }}>
					<Comment /><Comment /><Comment /><Comment /><Comment /><Comment /><Comment /><Comment />
				</div>
				<CommentInput />
			</div>
		);
	}
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
				padding: "5px 10px",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			}}
		>
			<Typography variant="body1" style={{ color: "white" }}>
				{description}
			</Typography>
		</div>
	);
};

const Comment: React.SFC<{}> = props => {
	return (
		<Paper style={{ margin: "5px", padding: 10 }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="body1">Name</Typography>
				<Typography variant="body1">08:00</Typography>
			</div>
			<Typography paragraph>Main yuk</Typography>
		</Paper>
	);
};

const CommentInput: React.SFC<{}> = props => {
	return (
		<div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", backgroundColor: "#eee", padding: 5, position: "fixed", bottom: 0, right: 0, left: 0 }}>
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
			/>
			<IconButton>
				<Send />
			</IconButton>
		</div>
	);
};

export default DiscussionRoom;
