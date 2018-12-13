import * as React from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux";
import CreateRoom from "./containers/hostRoom/CreateRoom";
import DiscussionRoom from "./containers/hostRoom/DiscussionRoom";
import List from "./List";

export const history = createBrowserHistory();

class App extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						{/* TODO: @agung add your event view here */}
						<Route path="/events" component={List} />
						<Route path="/events/:id" component={DiscussionRoom} />
						<Route path="/create-event" component={CreateRoom} />
						<Redirect to="/create-event" />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
