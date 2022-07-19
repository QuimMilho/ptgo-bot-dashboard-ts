import { Snowflake } from 'discord.js';
import React from 'react';
import { APIUserInfo } from '../../../types/API';
import Select from 'react-select';

function GuildSelect(props: {
	guilds: APIUserInfo[];
	value: Snowflake | null;
	onChange: Function | undefined;
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
			onChange={(value) =>
				props.onChange ? props.onChange(value?.value) : undefined
			}
			isClearable={props.clearable}
		/>
	);
}

export default GuildSelect;
