import { Snowflake } from 'discord.js';
import React from 'react';
import { MemberInfo } from '../../../types/API';
import Select from 'react-select';

function MemberSelect(props: {
	members: MemberInfo[];
	value: Snowflake | null;
	onChange: Function | undefined;
	clearable: boolean;
}) {
	const options: { label: string; value: string }[] = [];
	for (let i = 0; i < props.members.length; i++) {
		const member = props.members[i];

		options.push({
			label:
				member.displayName === member.username
					? `${member.username}#${member.discriminator}`
					: `${member.displayName} (${member.username}#${member.discriminator})`,
			value: member.id,
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

export default MemberSelect;
