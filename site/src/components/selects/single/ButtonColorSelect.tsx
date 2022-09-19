import React from 'react';
import Select from 'react-select';

function ButtonColorSelect(props: {
	value: 'DANGER' | 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | null;
	onChange:
		| ((v: 'DANGER' | 'PRIMARY' | 'SECONDARY' | 'SUCCESS') => void)
		| undefined;
}) {
	const options: {
		label: string;
		value: 'DANGER' | 'PRIMARY' | 'SECONDARY' | 'SUCCESS';
		color: string;
	}[] = [
		{ label: 'Verde', value: 'SUCCESS', color: '#4EA459' },
		{ label: 'Vermelho', value: 'DANGER', color: '#E24546' },
		{ label: 'Azul', value: 'PRIMARY', color: '#5E66F4' },
		{ label: 'Cinzento', value: 'SECONDARY', color: '#50545C' },
	];
	return (
		<Select
			options={options}
			value={options.find((o) => o.value === props.value)}
			isSearchable={true}
			onChange={(value) => {
				if (!value?.value) return;
				if (props.onChange) props.onChange(value.value);
			}}
			isClearable={false}
		/>
	);
}

export default ButtonColorSelect;

/*
styles={{
				option: (provided, state) => {
					return {
						...provided,
						color: `${state.data.color}`,
					};
				},
				singleValue: (provided, state) => {
					return {
						...provided,
						color: `${state.data.color}`,
					};
				},
			}}
*/
