import React from 'react';
import { MemberInfo, RoleInfo } from '../../../types/API';
import Select from 'react-select';
import { Snowflake } from 'discord.js';

function MultipleRoleMemberSelect(props: {
	roles: RoleInfo[];
	members: MemberInfo[];
	value: Snowflake[] | null;
	onChange: ((v: Snowflake[]) => void) | undefined;
	clearable: boolean | undefined;
}) {
	const options: { label: string; value: string; color: string }[] = [];
	for (let i = 0; i < props.roles.length; i++) {
		const role = props.roles[i];

		options.push({
			label: `${role.name} (Role)`,
			value: role.id,
			color: role.colorHex,
		});
	}
	for (let i = 0; i < props.members.length; i++) {
		const member = props.members[i];

		options.push({
			label:
				member.displayName !== member.username
					? `${member.displayName} (${member.username}#${member.discriminator})`
					: `${member.username}#${member.discriminator}`,
			color: '#000000',
			value: member.id,
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
			styles={{
				option: (provided, state) => {
					return {
						...provided,
						color: `${state.data.color}`,
					};
				},
				multiValueLabel: (provided, state) => {
					return {
						...provided,
						color: `${state.data.color}`,
					};
				},
			}}
		/>
	);
}

export default MultipleRoleMemberSelect;
