import { Snowflake } from 'discord.js';
import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { LogsOptions } from '../../../types/Features';
import MultipleTextChannelSelect from '../../selects/multiple/MultipleTextChannelSelect';

function LogsConfig(props: {
	value: LogsOptions;
	onChange: (v: LogsOptions) => void | undefined;
	guild: APIUserGuildsInfo;
}) {
	return (
		<div className="widthMax">
			<span className="white">Logs de canais</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v: Snowflake[]) => {
					const temp = { ...props.value };
                    temp.chat = v;
                    if (props.onChange) props.onChange(temp);
				}}
				value={props.value.chat}
			/>
            <br />
            <span className="white">Logs de convites</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v: Snowflake[]) => {
					const temp = { ...props.value };
                    temp.invite = v;
                    if (props.onChange) props.onChange(temp);
				}}
				value={props.value.invite}
			/>
            <br />
            <span className="white">Logs de membros</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v: Snowflake[]) => {
					const temp = { ...props.value };
                    temp.member = v;
                    if (props.onChange) props.onChange(temp);
				}}
				value={props.value.member}
			/>
            <br />
            <span className="white">Logs de mensagens</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v: Snowflake[]) => {
					const temp = { ...props.value };
                    temp.message = v;
                    if (props.onChange) props.onChange(temp);
				}}
				value={props.value.message}
			/>
            <br />
            <span className="white">Logs de roles</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v: Snowflake[]) => {
					const temp = { ...props.value };
                    temp.role = v;
                    if (props.onChange) props.onChange(temp);
				}}
				value={props.value.role}
			/>
            <br />
            <span className="white">Logs de Utilizadores</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v: Snowflake[]) => {
					const temp = { ...props.value };
                    temp.user = v;
                    if (props.onChange) props.onChange(temp);
				}}
				value={props.value.user}
			/>
            <br />
		</div>
	);
}

export default LogsConfig;
