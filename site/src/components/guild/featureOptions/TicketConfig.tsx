import React, { useState, useEffect } from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { TicketOptions } from '../../../types/Features';
import { createCustomEmbed } from '../../../utils/createObjects';
import MultipleRoleSelect from '../../selects/multiple/MultipleRoleSelect';
import CategorySelect from '../../selects/single/CategorySelect';
import Select from 'react-select';
import TextChannelSelect from '../../selects/single/TextChannelSelect';
import MessageContentBuilderPreview from '../../input/MessageContentBuilderPreview';
import EmbedBuilder from '../../input/EmbedBuilder';
import ButtonBuilder from '../../input/ButtonBuilder';
import MessageContentBuilderPlaceholder from '../../input/MessageContentBuilderPlaceholder';

const createChannelSelectOptions: {
	label: string;
	value: 'END' | 'ABOVE' | 'BELOW';
}[] = [
	{ label: 'No fim da categoria', value: 'END' },
	{ label: 'Por cima de um canal específico', value: 'ABOVE' },
	{ label: 'Por baixo de um canal específico', value: 'BELOW' },
];

function TicketConfig(props: {
	value: TicketOptions;
	onChange: (v: TicketOptions) => void | undefined;
	guild: APIUserGuildsInfo;
}) {
	const [data] = useState({
		name: props.guild.member.username,
		mention: `<@${props.guild.member.id}>`,
		staff: `${props.value.roles.staff.map((r) => `<@&${r}> `)}`,
		moderator: `${props.value.roles.moderator.map((r) => `<@&${r}> `)}`,
		channelName: `#ticket-6969`,
		channelMention: `#ticket-6969`,
	});
	return (
		<div className="widthMax">
			<span className="white bold">Roles</span>
			<br />
			<br />
			<span className="white">Roles de moderadores</span>
			<br />
			<span className="white small">
				Conseguem ver, escrever e interagir com um ticket que não é deles.
			</span>
			<MultipleRoleSelect
				clearable={true}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.roles.moderator = v;
					if (props.onChange) props.onChange(temp);
				}}
				roles={props.guild.guild.roles}
				value={props.value.roles.moderator}
			/>
			<br />
			<span className="white">Roles de staff</span>
			<br />
			<span className="white small">
				Conseguem ver um ticket que não é deles.
			</span>
			<MultipleRoleSelect
				clearable={true}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.roles.staff = v;
					if (props.onChange) props.onChange(temp);
				}}
				roles={props.guild.guild.roles}
				value={props.value.roles.staff}
			/>
			<br />
			<span className="white">Roles proíbidas de abrir ticket</span>
			<MultipleRoleSelect
				clearable={true}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.roles.forbiden = v;
					if (props.onChange) props.onChange(temp);
				}}
				roles={props.guild.guild.roles}
				value={props.value.roles.forbiden}
			/>
			<br />
			<br />
			<span className="white bold">Canal do ticket</span>
			<br />
			<span className="white">Categoria de criação</span>
			<CategorySelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.createChannel.category = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.createChannel.category}
			/>
			<br />
			<span className="white">Onde criar o canal</span>
			<Select
				options={createChannelSelectOptions}
				value={createChannelSelectOptions.find(
					(o) => o.value === props.value.createChannel.selected
				)}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.createChannel.selected = v?.value ? v.value : 'END';
					if (props.onChange) props.onChange(temp);
				}}
				isClearable={false}
			/>
			<br />
			{props.value.createChannel.selected === 'ABOVE' ||
			props.value.createChannel.selected === 'BELOW' ? (
				<div>
					<span className="white">Canal do ticket em relação a</span>
					<TextChannelSelect
						channels={props.guild.guild.channels}
						clearable={true}
						onChange={(v) => {
							const temp = { ...props.value };
							temp.createChannel.channel = v;
							if (props.onChange) props.onChange(temp);
						}}
						value={props.value.createChannel.channel}
					/>
				</div>
			) : undefined}
			<br />
			<span className="white bold">Mensagem de abertura</span>
			<br />
			<span className="white">Conteúdo da mensagem</span>
			<br />
			<MessageContentBuilderPlaceholder
				guild={props.guild}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.openMessage.message = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.openMessage.message}
				data={data}
			/>
			<span className="white small">
				$name$ - Nome do membro (dentro da guild) que abriu ticket ([Vip]
				Brownie)
				<br />
				$mention$ - Menção do membro que abriu ticket
				<br />
				$staff$ - Menção das roles que podem ver o ticket
				<br />
				$moderator$ - Menção das roles que podem interagir no ticket
				<br />
				$channelName$ - Nome do canal do ticket
				<br />
				$channelMention$ - Menção do canal do ticket
			</span>
			<br />
			<span className="white">Embed da abertura</span>
			<br />
			<EmbedBuilder
				embed={props.value.openMessage.embed}
				guild={props.guild}
				label={undefined}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.openMessage.embed = v;
					if (props.onChange) props.onChange(temp);
				}}
				data={data}
			/>
			<br />
			<span className="white bold">Botão de fechar ticket</span>
			<br />
			<ButtonBuilder
				value={props.value.openMessage.button}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.openMessage.button = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
		</div>
	);
}

export default TicketConfig;
