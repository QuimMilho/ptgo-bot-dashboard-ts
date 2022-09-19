import React from 'react';
import '../../styles/input.scss';

function SmallText(props: {
	value: string | number | undefined | null;
	onChange: ((v: string) => void) | undefined;
	label: string | undefined;
}) {
	return (
		<div className='smallText'>
            {props.label ? (
				<div>
					<span className='white'>{props.label}</span>
					<br />
				</div>
			) : undefined}
			<input
				type={'text'}
				onChange={(e) =>
					props.onChange ? props.onChange(e.target.value) : undefined
				}
				value={props.value ? props.value : undefined}
			/>
		</div>
	);
}

export default SmallText;
