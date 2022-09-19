import React, { useState } from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { LeaveMessageOptions } from '../../../types/Features';
import { generateRandomId } from '../../../utils/random';
import BigText from '../../input/BigText';
import Checkbox from '../../input/Checkbox';
import MultipleTextChannelSelect from '../../selects/multiple/MultipleTextChannelSelect';
import LeaveMessagePreview from './moreOptions/LeaveMessagePreview';
import replaceString from 'string-placeholder';

function LeaveMessageConfig(props: {
	value: LeaveMessageOptions;
	onChange: (v: LeaveMessageOptions) => void | undefined;
	guild: APIUserGuildsInfo;
}) {
	const [data] = useState({
		memberName: props.guild.member.username,
		memberMention: `<@${props.guild.member.id}>`,
		serverName: props.guild.guild.name,
		numberOfMembers: props.guild.guild.memberCount + 1,
	});
	return (
		<div className="widthMax">
			<span className="white bold">Mensagens</span>
			<br />
			<br />
			<span className="white">Mensagem de saída</span>
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
				<LeaveMessagePreview value={props.value.messages} guild={props.guild} />
			) : undefined}
			<br />
			<br />
			<span className="bold white">Canais</span>
			<br />
			<br />
			<span className="white">Canal de logs</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.logs = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.logs}
			/>
		</div>
	);
}

export default LeaveMessageConfig;
