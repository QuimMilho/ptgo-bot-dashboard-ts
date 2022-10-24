import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import Select from 'react-select';

function GuildSelect(props: {
	guilds: APIUserGuildsInfo[];
	value: string | null;
	onChange: ((v: string) => void) | undefined;
	clearable: boolean | undefined;
}) {
	const options: { label: string; value: string }[] = [];
	for (let i = 0; i < props.guilds.length; i++) {
		const guild = props.guilds[i];
		options.push({ label: guild.guild.name, value: guild.guild.id });
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
		/>
	);
}

export default GuildSelect;
