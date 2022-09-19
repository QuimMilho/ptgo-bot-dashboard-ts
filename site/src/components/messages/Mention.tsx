import React from 'react';

function MentionElement(props: { color: string | undefined; text: string }) {
	return (
		<span
			style={{
				backgroundColor: props.color ? props.color : '#424676',
				borderRadius: '3px',
			}}
		>
			{props.text}
		</span>
	);
}

export default MentionElement;
