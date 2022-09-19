import React, { useState } from 'react';
import '../../styles/input.scss';
import { APIUserGuildsInfo } from '../../types/API';
import { generateRandomId } from '../../utils/random';
import Error from '../pages/Error';
import ChannelSelect from '../selects/single/ChannelSelect';
import MemberSelect from '../selects/single/MemberSelect';
import RoleSelect from '../selects/single/RoleSelect';
import BigText from './BigText';

function MessageContentBuilder(props: {
	value: string | number | undefined | null;
	onChange: ((v: string) => void) | undefined;
	label: string | undefined;
	guild: APIUserGuildsInfo | undefined;
}) {
	const [id, setId] = useState(generateRandomId(16));
	if (!props.guild) return <Error />;
	const changeMention = (newValue: string | null, prefix: string) => {
		const textbox = document.getElementById(`${id}`) as HTMLInputElement;
		if (!textbox) return console.log('textbox not found!');
		let before = textbox?.value.slice(0, textbox.selectionStart as number);
		let after = textbox?.value.slice(textbox.selectionStart as number);
		textbox.value = before + `<${prefix}${newValue}> ` + after;
		if (props.onChange) props.onChange(textbox.value);
	};
	return (
		<div className="messageContentBuilder">
			{props.label ? (
				<div>
					<span className="white">{props.label}</span>
					<br />
				</div>
			) : undefined}
			<div className="messageContentBuilderInput">
				<div className="mcbifirst">
					<BigText
						onChange={props.onChange}
						label={undefined}
						value={props.value}
						id={id}
					/>
				</div>
				<div className="mcbilast">
					<MemberSelect
						onChange={(v: string) => changeMention(v, '@')}
						value={null}
						clearable={false}
						members={props.guild.guild.members}
					/>
					<RoleSelect
						onChange={(v: string) => changeMention(v, '@&')}
						value={null}
						clearable={false}
						roles={props.guild.guild.roles}
					/>
					<ChannelSelect
						onChange={(v: string) => changeMention(v, '#')}
						value={null}
						clearable={false}
						channels={props.guild.guild.channels}
					/>
				</div>
			</div>
		</div>
	);
}

export default MessageContentBuilder;
