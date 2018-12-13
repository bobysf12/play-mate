import * as React from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux";
import CreateRoom from "./containers/hostRoom/CreateRoom";
import DiscussionRoom from "./containers/hostRoom/DiscussionRoom";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";

export const history = createBrowserHistory();

class App extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						{/* TODO: @agung add your event view here */}
						{/* <Route path="/events" component={Event} /> */}
						<Route path="/events/:id" component={DiscussionRoom} />
						<Route path="/create-event" component={CreateRoom} />
						<Redirect to="/login" />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
