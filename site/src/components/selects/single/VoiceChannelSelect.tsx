import { Snowflake } from 'discord.js';
import React from 'react';
import { ChannelInfo } from '../../../types/API';
import Select from 'react-select';

function VoiceChannelSelect(props: {
	channels: ChannelInfo[];
	value: Snowflake | null;
	onChange: Function | undefined;
	clearable: boolean;
}) {
	const options: { label: string; value: string }[] = [];
	for (let i = 0; i < props.channels.length; i++) {
		const channel = props.channels[i];
		if (channel.type === 'GUILD_VOICE' || channel.type === 'GUILD_STAGE_VOICE')
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
			value={options.find((o) => o.value === props.value)}
			isSearchable={true}
			onChange={(value) =>
				props.onChange ? props.onChange(value?.value) : undefined
			}
			isClearable={props.clearable}
		/>
	);
}

export default VoiceChannelSelect;
