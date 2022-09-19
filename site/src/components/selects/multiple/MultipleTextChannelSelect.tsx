import React from 'react';
import { ChannelInfo } from '../../../types/API';
import Select from 'react-select';
import { Snowflake } from 'discord.js';

function MultipleTextChannelSelect(props: {
	channels: ChannelInfo[];
	value: Snowflake[] | null;
	onChange: ((v: Snowflake[]) => void) | undefined;
	clearable: boolean | undefined;
}) {
	const options: { label: string; value: string }[] = [];
	for (let i = 0; i < props.channels.length; i++) {
		const channel = props.channels[i];
		if (channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_NEWS')
			options.push({
				label: channel.parent
					? `${channel.name} (${channel.parent.name})`
					: channel.name,
				value: channel.id,
			});
	}
	return (
		<Select
			options={options}
			value={options.filter((o) => props.value?.find((v) => o.value === v))}
			isSearchable={true}
			onChange={(value) => {
				if (props.onChange) {
					const array: Snowflake[] = [];
					for (let i = 0; i < value.length; i++) {
						array.push(value[i].value);
					}
					props.onChange(array);
				}
			}}
			isClearable={props.clearable}
			isMulti={true}
		/>
	);
}

export default MultipleTextChannelSelect;
