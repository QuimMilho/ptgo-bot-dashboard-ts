import React from 'react';

export default function Warning(props: {
	title: string;
	text: string;
	opened: boolean;
	clicked: Function;
}) {
	return (
		<div
			className="warning"
			style={{ display: props.opened ? 'flex' : 'none' }}
		>
			<span className="bold">{props.title}</span>
			<br />
			<br />
			<span className="">{props.text}</span>
			<br />
			<br />
			<button onClick={() => {props.clicked()}}>Fechar</button>
		</div>
	);
}
