import React from 'react';
import { CustomSmallButton } from '../../types/Messages';
import ButtonColorSelect from '../selects/single/ButtonColorSelect';
import SmallText from './SmallText';

function ButtonBuilder(props: {
	value: CustomSmallButton;
	onChange: (v: CustomSmallButton) => void | undefined;
}) {
	return (
		<div>
			<span className="white">Texto do botão</span>
			<br />
			<SmallText
				label={undefined}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.label = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.label}
			/>
			<br />
			<br />
			<span className="white">Cor do botão</span>
			<ButtonColorSelect
				onChange={(v) => {
					const temp = { ...props.value };
					temp.style = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.style}
			/>
		</div>
	);
}

export default ButtonBuilder;