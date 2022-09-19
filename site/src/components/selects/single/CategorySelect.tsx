import React from 'react';
import { ChannelInfo } from '../../../types/API';
import Select from 'react-select';
import { Snowflake } from 'discord.js';

function CategorySelect(props: {
	channels: ChannelInfo[];
	value: Snowflake | null;
	onChange: ((v: Snowflake) => void) | undefined;
	clearable: boolean | undefined;
}) {
	const options: { label: string; value: string }[] = [];
	for (let i = 0; i < props.channels.length; i++) {
		const channel = props.channels[i];
		if (channel.type === 'GUILD_CATEGORY')
			options.push({
				label: channel.name,
				value: channel.id,
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
		/>
	);
}

export default CategorySelect;
