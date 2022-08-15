import React from 'react';
import '../../styles/input.scss';

function Checkbox(props: {
	value: boolean | undefined;
	onChange: Function | undefined;
	label: string;
}) {
	return (
		<label className="checkbox">
			<input
				type={'checkbox'}
				onChange={(e) => props.onChange ? props.onChange(e.target.checked) : undefined}
				value={props.value ? 'checked' : undefined}
			/>
			{props.label}
		</label>
	);
}

export default Checkbox;
