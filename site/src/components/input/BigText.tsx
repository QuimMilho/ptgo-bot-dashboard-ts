import React from 'react';
import '../../styles/input.scss';

function BigText(props: {
	value: string | number | undefined | null;
	onChange: Function | undefined;
	label: string | undefined;
	id: string | undefined;
}) {
	return (
		<div className="bigText">
			{props.label ? (
				<div>
					<span className="white">{props.label}</span>
					<br />
				</div>
			) : undefined}
			<textarea
				onChange={(e) =>
					props.onChange ? props.onChange(e.target.value) : undefined
				}
				value={props.value ? props.value : undefined}
				id={props.id}
			/>
		</div>
	);
}

export default BigText;
