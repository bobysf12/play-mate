import * as React from "react";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import Container from "src/components/Container";
import { connect } from "react-redux";
import { RootState } from "src/redux";
import { login } from "src/redux/auth/actions";

interface FormValues {
	username: string;
	password: string;
}

interface StateProps {
	isLoggingIn?: boolean;
}
interface DispatchProps {
	login: (username: string, password: string) => void;
}
interface OwnProps {}
interface Props extends StateProps, DispatchProps, OwnProps {}
interface State {
	formValues: FormValues;
}

class Login extends React.Component<Props, State> {

	state: State = {
		formValues: {
			username: "",
			password: ""
		}
	}

	render() {
		const { isLoggingIn } = this.props;
		const { username, password } = this.state.formValues;
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
				<Paper style={{ padding: 10 }}>
					<div style={{ marginBottom: 10 }}>
						<TextField label="Username" type="text" value={username} fullWidth InputLabelProps={{ shrink: true }} onChange={this.changeText("username")} />
						<TextField label="Password" type="password" value={password} fullWidth InputLabelProps={{ shrink: true }} onChange={this.changeText("password")} />
					</div>
					<Button variant="contained" color="primary" onClick={this.login} disabled={isLoggingIn}>
						Login
					</Button>
				</Paper>
			</Container>
		);
	}

	changeText = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		this.setState({
			formValues: {
				...this.state.formValues,
				[name]: e.currentTarget.value
			}
		})
	}

	login = () => {
		// tslint:disable-next-line
		const { login } = this.props;
		const { username, password } = this.state.formValues;

		login(username, password);
	};
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
	state => ({
		isLoggingIn: state.auth.isLoggingIn,
	}),
	{
		login,
	},
)(Login);
