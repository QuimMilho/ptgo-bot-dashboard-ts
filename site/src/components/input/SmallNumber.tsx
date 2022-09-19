import React from 'react';
import '../../styles/input.scss';

function SmallNumber(props: {
	value: string | number | undefined | null;
	onChange: ((v: number) => void) | undefined;
	label: string | undefined;
	max: number | undefined;
	min: number | undefined;
}) {
	return (
		<div className="smallText">
			{props.label ? (
				<div>
					<span className="white">{props.label}</span>
				</div>
			) : undefined}
			<input
				type={'number'}
				onChange={(e) =>
					props.onChange ? props.onChange(parseInt(e.target.value)) : undefined
				}
				value={props.value ? props.value : undefined}
				max={props.max}
				min={props.min}
			/>
			{props.min ? (
				<span className="white small">Min: {props.min}</span>
			) : undefined}
			{props.min && props.max ? <span>{'   '}</span> : undefined}
			{props.max ? (
				<span className="white small">Max: {props.max}</span>
			) : undefined}
		</div>
	);
}

export default SmallNumber;
