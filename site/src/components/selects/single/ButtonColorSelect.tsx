import React from 'react';
import Select from 'react-select';

function ButtonColorSelect(props: {
	value: 'Danger' | 'Primary' | 'Secondary' | 'Success' | null;
	onChange:
		| ((v: 'Danger' | 'Primary' | 'Secondary' | 'Success') => void)
		| undefined;
}) {
	const options: {
		label: string;
		value: 'Danger' | 'Primary' | 'Secondary' | 'Success';
		color: string;
	}[] = [
		{ label: 'Verde', value: 'Success', color: '#4EA459' },
		{ label: 'Vermelho', value: 'Danger', color: '#E24546' },
		{ label: 'Azul', value: 'Primary', color: '#5E66F4' },
		{ label: 'Cinzento', value: 'Secondary', color: '#50545C' },
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
		/>
	);
}

export default ButtonColorSelect;
