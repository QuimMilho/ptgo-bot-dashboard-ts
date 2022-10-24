import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { ModerationOptions } from '../../../types/Features';
import Checkbox from '../../input/Checkbox';
import SmallNumber from '../../input/SmallNumber';
import MultipleRoleSelect from '../../selects/multiple/MultipleRoleSelect';
import MultipleTextChannelSelect from '../../selects/multiple/MultipleTextChannelSelect';

function ModerationConfig(props: {
	value: ModerationOptions;
	onChange: (v: ModerationOptions) => void | undefined;
	guild: APIUserGuildsInfo;
}) {
	return (
		<div className='widthMax'>
			<span className="bold white">Automod</span>
			<br />
			<span className="white">Canal onde apagar mensagens automaticamente</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v: string[]) => {
					const temp = { ...props.value };
					temp.automod.autoDeleteMessages = [...v];
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.automod.autoDeleteMessages}
			/>
			<br />
			<Checkbox
				label={"Moderar automaticamente convites de discord"}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.automod.discordInvites = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.automod.discordInvites}
			/>
			<br /><br />
			<Checkbox
				label={"Moderar automaticamente mensagens duplicadas"}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.automod.duplicatedMessages = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.automod.duplicatedMessages}
			/>
			<br /><br />
			<Checkbox
				label={"Moderar automaticamente links"}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.automod.links = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.automod.links}
			/>
			<br /><br />
			<span className="white">Limitar quantidade de emojis numa mensagem</span>
			<SmallNumber
				label={undefined}
				max={50}
				min={0}
				onChange={(v: number) => {
					const temp = { ...props.value };
					temp.automod.massEmoji = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.automod.massEmoji}
			/>
			<br />
			<span className="white">Limitar quantidade de menções numa mensagem</span>
			<SmallNumber
				label={undefined}
				max={50}
				min={0}
				onChange={(v: number) => {
					const temp = { ...props.value };
					temp.automod.massEmoji = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.automod.massEmoji}
			/>
			<br /> <br />
			<span className="white bold">Bans e Roles</span>
			<br />
			<br />
			<Checkbox
				label="Precisas de estar dentro do servidor para o tempo passar"
				value={props.value.timedPunitions}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.timedPunitions = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			<br />
			<br />
			<span className="white">Roles de mute</span>
			<MultipleRoleSelect
				roles={props.guild.guild.roles}
				clearable={true}
				value={props.value.mutedRoles}
				onChange={(v: string[]) => {
					const temp = { ...props.value };
					temp.mutedRoles = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			<br />
			<Checkbox
				label="Bans por role"
				value={props.value.banRoles}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.banRoles = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.banRoles ? (
				<div>
					<br />
					<span className="white">Roles de ban</span>
					<MultipleRoleSelect
						roles={props.guild.guild.roles}
						clearable={true}
						value={props.value.bannedRoles}
						onChange={(v: string[]) => {
							const temp = { ...props.value };
							temp.bannedRoles = v;
							if (props.onChange) props.onChange(temp);
						}}
					/>
				</div>
			) : undefined}
			<br /> <br />
			<span className="white bold">Avisos</span>
			<br />
			<SmallNumber
				label="Duração dos avisos"
				max={168}
				min={1}
				onChange={(v: number) => {
					const temp = { ...props.value };
					temp.warns.warnExpires = v;
					props.onChange(temp);
				}}
				value={props.value.warns.warnExpires}
			/>
			<br />
			<SmallNumber
				label="Número de avisos para haver punição"
				max={25}
				min={0}
				onChange={(v: number) => {
					const temp = { ...props.value };
					temp.warns.maxWarnings = v;
					props.onChange(temp);
				}}
				value={props.value.warns.maxWarnings}
			/>
			<br />
			<SmallNumber
				label="Duração do mute por avisos"
				max={168}
				min={1}
				onChange={(v: number) => {
					const temp = { ...props.value };
					temp.warns.warnExpires = v;
					props.onChange(temp);
				}}
				value={props.value.warns.warnExpires}
			/>
			<br /> <br />
			<span className="white bold">Moderadores e Logs</span>
			<br />
			<span className="white">Roles de moderador</span>
			<MultipleRoleSelect
				roles={props.guild.guild.roles}
				clearable={true}
				value={props.value.moderators}
				onChange={(v: string[]) => {
					const temp = { ...props.value };
					temp.moderators = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			<br />
			<span className='white'>Canal de logs de moderação</span>
			<MultipleTextChannelSelect
				channels={props.guild.guild.channels}
				clearable={true}
				onChange={(v: string[]) => {
					const temp = { ...props.value };
					temp.logs = v;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.value.logs}
			/>
		</div>
	);
}

export default ModerationConfig;
