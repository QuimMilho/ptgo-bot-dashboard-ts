import React, { useState } from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { JoinMessageOptions } from '../../../types/Features';
import { generateRandomId } from '../../../utils/random';
import BigText from '../../input/BigText';
import Checkbox from '../../input/Checkbox';
import SmallText from '../../input/SmallText';
import MultipleTextChannelSelect from '../../selects/multiple/MultipleTextChannelSelect';
import JoinMessagePreview from './moreOptions/JoinMessagePreview';
import replaceString from 'string-placeholder';

function JoinMessageConfig(props: {
	value: JoinMessageOptions;
	onChange: (v: JoinMessageOptions) => void | undefined;
	guild: APIUserGuildsInfo;
}) {
	const [data] = useState({
		memberName: props.guild.member.username,
		memberMention: `<@${props.guild.member.id}>`,
		serverName: props.guild.guild.name,
		numberOfMembers: props.guild.guild.memberCount + 1,
	});
	const [data2] = useState({
		invitedName: props.guild.member.username,
		invitedMention: `<@${props.guild.member.id}>`,
		inviterName: props.guild.member.username,
		inviterMention: `<@${props.guild.member.id}>`,
		numberOfInvites: props.guild.guild.memberCount + 1,
	});
	const [data3] = useState({
		invitedName: props.guild.member.username,
		invitedMention: `<@${props.guild.member.id}>`,
	});
	return (
		<div className="widthMax">
			<span className="white bold">Mensagens</span>
			<br />
			<br />
			<span className="white">Mensagem de entrada</span>
			<br />
			<div style={{ height: '100px' }}>
				<BigText
					id={generateRandomId(16)}
					label={undefined}
					onChange={(v: string) => {
						const temp = { ...props.value };
						temp.messages.message = v;
						if (props.onChange) props.onChange(temp);
					}}
					value={props.value.messages.message}
				/>
			</div>
			<span className="white small">
				Placeholders:
				<br />
				$memberName$
				<br />
				$memberMention$
				<br />
				$serverName$
				<br />
				$numberOfMembers$
			</span>
			<br />
			<br />
			<span className="white">Imagem de entrada</span>
			<br />
			<br />
			<Checkbox
				label="Ativar"
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.messages.imagem = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.messages.imagem}
			/>
			<br />
			<br />
			{props.value.messages.imagem ? (
				<div>
					<span className="white">Mensagem da imagem</span>
					<br />
					<br />
					<div style={{ height: '100px' }}>
						<BigText
							id={generateRandomId(16)}
							label={undefined}
							onChange={(v: string) => {
								const temp = { ...props.value };
								temp.messages.imageMessage = v;
								if (props.onChange) props.onChange(temp);
							}}
							value={props.value.messages.imageMessage}
						/>
					</div>
					<span className="white small">
						Placeholders:
						<br />
						$memberName$
						<br />
						$serverName$
						<br />
						$numberOfMembers$
					</span>
					<br />
					<br />
				</div>
			) : undefined}
			<span className="white">
				{replaceString(props.value.messages.message, data, {
					before: '$',
					after: '$',
				})
					.split('\n')
					.map((m) => (
						<span>
							{m}
							<br />
						</span>
					))}
			</span>
			<br />
			{props.value.messages.imagem ? (
				<JoinMessagePreview value={props.value.messages} guild={props.guild} />
			) : undefined}
			<br />
			<br />
			<span className="bold white">Mensagens de convites</span>
			<br />
			<br />
			<span className="white">Convite encontrado</span>
			<SmallText
				label={undefined}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.messages.inviteMessage = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.messages.inviteMessage}
			/>
			<span className="white small">
				Placeholders:
				<br />
				$invitedName$
				<br />
				$invitedMention$
				<br />
				$inviterName$
				<br />
				$inviterMention$
				<br />
				$numberOfInvites$
			</span>
			<br />
			<span className="white">
				{replaceString(props.value.messages.inviteMessage, data2, {
					before: '$',
					after: '$',
				})}
			</span>
			<br />
			<br />
			<span className="white">Convite não encontrado</span>
			<SmallText
				label={undefined}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.messages.noInviteMessage = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.messages.noInviteMessage}
			/>
			<span className="white small">
				Placeholders:
				<br />
				$invitedName$
				<br />
				$invitedMention$
			</span>
			<br />
			<span className="white">
				{replaceString(props.value.messages.noInviteMessage, data3, {
					before: '$',
					after: '$',
				})}
			</span>
			<br />
			<br />
			<span className="bold white">Canais</span>
			<br />
			<br />
			<span className="white">Canal de convites</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.channels.invites = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.channels.invites}
			/>
			<br />
			<span className="white">Canal de logs</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.channels.logs = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.channels.logs}
			/>
		</div>
	);
}

export default JoinMessageConfig;
