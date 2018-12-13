import * as React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container: React.SFC<ContainerProps> = props => (
	<div
		{...props}
		style={{
			height: "100%",
			...props.style,
		}}
	/>
);

export default Container;
