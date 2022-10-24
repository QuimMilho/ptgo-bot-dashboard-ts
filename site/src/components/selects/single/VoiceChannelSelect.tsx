import React from 'react';
import { ChannelInfo } from '../../../types/API';
import Select from 'react-select';

function VoiceChannelSelect(props: {
	channels: ChannelInfo[];
	value: string | null;
	onChange: ((v: string) => void) | undefined;
	clearable: boolean;
}) {
	const options: { label: string; value: string }[] = [];
	for (let i = 0; i < props.channels.length; i++) {
		const channel = props.channels[i];
		if (channel.type === 'GuildVoice' || channel.type === 'GuildStageVoice')
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
			onChange={(value) => {
				if (!value?.value) return;
				if (props.onChange) props.onChange(value.value);
			}}
			isClearable={props.clearable}
		/>
	);
}

export default VoiceChannelSelect;
