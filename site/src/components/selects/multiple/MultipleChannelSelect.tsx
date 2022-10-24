import React from 'react';
import { ChannelInfo } from '../../../types/API';
import Select from 'react-select';

function MultipleChannelSelect(props: {
	channels: ChannelInfo[];
	value: string[] | null;
	onChange: ((v: string[]) => void) | undefined;
	clearable: boolean | undefined;
}) {
	const options: { label: string; value: string }[] = [];
	for (let i = 0; i < props.channels.length; i++) {
		const channel = props.channels[i];
		if (channel.type !== 'GuildCategory')
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
					const array: string[] = [];
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

export default MultipleChannelSelect;
