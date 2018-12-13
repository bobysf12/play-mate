import * as React from "react";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import Container from "src/components/Container";
import { connect } from "react-redux";
import { RootState } from "src/redux";
import { register } from "src/redux/auth/actions";
import { history } from "src/App";

interface FormValues {
	username: string;
	password: string;
	name: string;
}

interface StateProps {
	isRegistering?: boolean;
}
interface DispatchProps {
	register: (username: string, password: string, name: string) => void;
}
interface OwnProps {}
interface Props extends StateProps, DispatchProps, OwnProps {}
interface State {
	formValues: FormValues;
}

class Register extends React.Component<Props, State> {
	state: State = {
		formValues: {
			username: "",
			password: "",
			name: "",
		},
	};

	render() {
		const { isRegistering } = this.props;
		const { username, password, name } = this.state.formValues;
		return (
			<Container
				style={{
					padding: 10,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<Typography variant="title">Play Mate</Typography>
					<Typography variant="caption">Find your best mate</Typography>
				</div>
				<div>
					<Paper style={{ padding: 10 }}>
						<Typography variant="subheading">Register</Typography>
						<div style={{ marginBottom: 10, marginTop: 10 }}>
							<TextField
								label="Name"
								type="text"
								value={name}
								fullWidth
								InputLabelProps={{ shrink: true }}
								onChange={this.changeText("name")}
							/>
							<TextField
								label="Username"
								type="text"
								value={username}
								fullWidth
								InputLabelProps={{ shrink: true }}
								onChange={this.changeText("username")}
							/>
							<TextField
								label="Password"
								type="password"
								value={password}
								fullWidth
								InputLabelProps={{ shrink: true }}
								onChange={this.changeText("password")}
							/>
						</div>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={this.login}
							disabled={isRegistering}
						>
							Register
						</Button>
					</Paper>
					<Button
						variant="text"
						color="secondary"
						fullWidth
						onClick={this.goToLogin}
						disabled={isRegistering}
					>
						Login
					</Button>
				</div>
			</Container>
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

	login = () => {
		// tslint:disable-next-line
		const { register } = this.props;
		const { username, password, name } = this.state.formValues;

		register(username, password, name);
	};

	goToLogin = () => {
		history.push("/login");
	};
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
	state => ({
		isRegistering: state.auth.isRegistering,
	}),
	{
		register,
	},
)(Register);
