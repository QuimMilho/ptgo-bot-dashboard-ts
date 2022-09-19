import { Snowflake } from 'discord.js';
import React from 'react';
import { RoleInfo } from '../../../types/API';
import Select from 'react-select';

function RoleSelect(props: {
	roles: RoleInfo[];
	value: Snowflake | null;
	onChange: ((v: Snowflake) => void) | undefined;
	clearable: boolean;
}) {
	const options: { label: string; value: string; color: string }[] = [];
	for (let i = 0; i < props.roles.length; i++) {
		const role = props.roles[i];

		options.push({
			label: role.name,
			value: role.id,
			color: role.colorHex,
		});
	}
	return (
		<Select
			options={options}
			value={options.find((o) => o.value === props.value)}
			isSearchable={true}
			onChange={(value) => {
				if (!value?.value) return;
				if (props.onChange) props.onChange(value.value);
			}}
			isClearable={props.clearable}
			styles={{
				option: (provided, state) => {
                    return {
                        ...provided,
                        color: `${state.data.color}`,
                    }
                },
                singleValue: (provided, state) => {
                    return {
                        ...provided,
                        color: `${state.data.color}`,
                    }
                }
			}}
		/>
	);
}

export default RoleSelect;
