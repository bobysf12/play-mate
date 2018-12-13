import * as React from "react";
import Paper from "@material-ui/core/Paper";

import DateFilter from "./DateFilter";
import TimeRange from "./TimeFilter";

export default class Filter extends React.PureComponent {
	render() {
		return (
			<div
				style={{
					position: "absolute",
					top: 20,
					left: 25,
					right: 25,
					height: 200,
					zIndex: 10,
					margin: "0 auto",
				}}
			>
				<Paper
					style={{
						padding: 5,
					}}
				>
					<DateFilter />
					<TimeRange />
				</Paper>
			</div>
		);
	}
}
