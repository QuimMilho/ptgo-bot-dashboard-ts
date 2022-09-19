import React from 'react';
import '../../styles/input.scss';

function Checkbox(props: {
	value: boolean | undefined;
	onChange: ((v: boolean) => void) | undefined;
	label: string | undefined;
}) {
	return (
		<label className="checkbox">
			<input
				type={'checkbox'}
				onChange={(e) => props.onChange ? props.onChange(e.target.checked) : undefined}
				value={props.value ? 'checked' : undefined}
				checked={props.value}
			/>
			{props.label}
		</label>
	);
}

export default Checkbox;
