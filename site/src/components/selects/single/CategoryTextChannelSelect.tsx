import React from 'react';
import { ChannelInfo } from '../../../types/API';
import Select from 'react-select';

function CategoryTextChannelSelect(props: {
	channels: ChannelInfo[];
	value: string | null;
	onChange: ((v: string) => void) | undefined;
	clearable: boolean;
	category: string | null;
}) {
	const options: { label: string; value: string }[] = [];
	for (let i = 0; i < props.channels.length; i++) {
		const channel = props.channels[i];
		if (
			(channel.type === 'GuildText' || channel.type === 'GuildAnnouncement') &&
			((props.category === null && channel.parent === null) ||
				props.category === channel.parent?.id)
		)
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

export default CategoryTextChannelSelect;
