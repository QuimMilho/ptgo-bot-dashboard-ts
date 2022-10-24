import React from 'react';
import { APIUserGuildsInfo } from '../../types/API';
import {
	AnounceOptions,
	Features,
	FormOptions,
	GiveAwayOptions,
	JoinMessageOptions,
	LeaveMessageOptions,
	LevelOptions,
	LogsOptions,
	MemberStatsOptions,
	ModerationOptions,
	ReactionRoleOptions,
	ServerListOptions,
	ServerStatsOptions,
	StaffListOptions,
	TicketOptions,
} from '../../types/Features';
import Checkbox from '../input/Checkbox';
import Folder from '../input/Folder';
import AnouncementsConfig from './featureOptions/AnouncementsConfig';
import FormsConfig from './featureOptions/FormsConfig';
import GiveawayConfig from './featureOptions/GiveawayConfig';
import JoinMessageConfig from './featureOptions/JoinMessageConfig';
import LeaveMessageConfig from './featureOptions/LeaveMessageConfig';
import LevelConfig from './featureOptions/LevelConfig';
import LogsConfig from './featureOptions/LogsConfig';
import MemberStatsConfig from './featureOptions/MemberStatsConfig';
import ModerationConfig from './featureOptions/ModerationConfig';
import PollsConfig from './featureOptions/PollsConfig';
import ReactionRoleConfig from './featureOptions/ReactionRolesConfig';
import ServerListConfig from './featureOptions/ServerListConfig';
import ServerStatsConfig from './featureOptions/ServerStatsConfig';
import StaffListConfig from './featureOptions/StaffListConfig';
import TicketConfig from './featureOptions/TicketConfig';

function FeatureEditor(props: {
	value: Features;
	onChange: (v: Features) => void | undefined;
	guild: APIUserGuildsInfo;
	guilds: APIUserGuildsInfo[];
}) {
	return (
		<div className="flex widthMax">
			<span className="white bold">É uma guild pública?</span>
			<br />
			<Checkbox
				value={props.value.public.active}
				label={'Sim, toda a gente pode ver informações sobre a mesma!'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.public.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			<br />
			{/*  */}
			<br />
			<span className="white bold">Moderação</span>
			<br />
			<Checkbox
				value={props.value.moderation.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.moderation.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.moderation.active ? (
				<Folder open={false} label={'Configuração'}>
					<ModerationConfig
						value={props.value.moderation}
						onChange={(v: ModerationOptions) => {
							const temp = { ...props.value };
							temp.moderation = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Logs</span>
			<br />
			<Checkbox
				value={props.value.logs.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.logs.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.logs.active ? (
				<Folder open={false} label={'Configuração'}>
					<LogsConfig
						value={props.value.logs}
						onChange={(v: LogsOptions) => {
							const temp = { ...props.value };
							temp.logs = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Mensagem de entrada</span>
			<br />
			<Checkbox
				value={props.value.joinmessage.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.joinmessage.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.joinmessage.active ? (
				<Folder open={false} label={'Configuração'}>
					<JoinMessageConfig
						value={props.value.joinmessage}
						onChange={(v: JoinMessageOptions) => {
							const temp = { ...props.value };
							temp.joinmessage = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Mensagem de saída</span>
			<br />
			<Checkbox
				value={props.value.leavemessage.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.leavemessage.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.leavemessage.active ? (
				<Folder open={false} label={'Configuração'}>
					<LeaveMessageConfig
						value={props.value.leavemessage}
						onChange={(v: LeaveMessageOptions) => {
							const temp = { ...props.value };
							temp.leavemessage = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Níveis (Desenvolvimento)</span>
			<br />
			<Checkbox
				value={props.value.level.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.level.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.level.active ? (
				<Folder open={false} label={'Configuração'}>
					<LevelConfig
						value={props.value.level}
						onChange={(v: LevelOptions) => {
							const temp = { ...props.value };
							temp.level = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Tickets</span>
			<br />
			<Checkbox
				value={props.value.ticket.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.ticket.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.ticket.active ? (
				<Folder open={false} label={'Configuração'}>
					<TicketConfig
						value={props.value.ticket}
						onChange={(v: TicketOptions) => {
							const temp = { ...props.value };
							temp.ticket = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">
				Estatísticas do servidor (Desenvolvimento)
			</span>
			<br />
			<Checkbox
				value={props.value.serverstats.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.serverstats.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.serverstats.active ? (
				<Folder open={false} label={'Configuração'}>
					<ServerStatsConfig
						value={props.value.serverstats}
						onChange={(v: ServerStatsOptions) => {
							const temp = { ...props.value };
							temp.serverstats = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">
				Estatísticas de membros (Desenvolvimento)
			</span>
			<br />
			<Checkbox
				value={props.value.memberstats.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.memberstats.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.memberstats.active ? (
				<Folder open={false} label={'Configuração'}>
					<MemberStatsConfig
						value={props.value.memberstats}
						onChange={(v: MemberStatsOptions) => {
							const temp = { ...props.value };
							temp.memberstats = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Reaction Roles (Desenvolvimento)</span>
			<br />
			<Checkbox
				value={props.value.reactionroles.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.reactionroles.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.reactionroles.active ? (
				<Folder open={false} label={'Configuração'}>
					<ReactionRoleConfig
						value={props.value.reactionroles}
						onChange={(v: ReactionRoleOptions) => {
							const temp = { ...props.value };
							temp.reactionroles = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Anúncios (Desenvolvimento)</span>
			<br />
			<Checkbox
				value={props.value.anouncements.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.anouncements.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.anouncements.active ? (
				<Folder open={false} label={'Configuração'}>
					<AnouncementsConfig
						value={props.value.anouncements}
						onChange={(v: AnounceOptions) => {
							const temp = { ...props.value };
							temp.anouncements = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Giveaways (Desenvolvimento)</span>
			<br />
			<Checkbox
				value={props.value.giveaway.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.giveaway.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.giveaway.active ? (
				<Folder open={false} label={'Configuração'}>
					<GiveawayConfig
						value={props.value.giveaway}
						onChange={(v: GiveAwayOptions) => {
							const temp = { ...props.value };
							temp.giveaway = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Polls (Desenvolvimento)</span>
			<br />
			<Checkbox
				value={props.value.polls.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.polls.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.polls.active ? (
				<Folder open={false} label={'Configuração'}>
					<PollsConfig
						value={props.value.polls}
						onChange={(v: GiveAwayOptions) => {
							const temp = { ...props.value };
							temp.polls = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Formulários</span>
			<br />
			<Checkbox
				value={props.value.forms.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.forms.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.forms.active ? (
				<Folder open={false} label={'Configuração'}>
					<FormsConfig
						value={props.value.forms}
						onChange={(v: FormOptions) => {
							const temp = { ...props.value };
							temp.forms = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
						guilds={props.guilds}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Lista de servidores (Desenvolvimento)</span>
			<br />
			<Checkbox
				value={props.value.serverlist.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.serverlist.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.serverlist.active ? (
				<Folder open={false} label={'Configuração'}>
					<ServerListConfig
						value={props.value.serverlist}
						onChange={(v: ServerListOptions) => {
							const temp = { ...props.value };
							temp.serverlist = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
			{/*  */}
			<br />
			<span className="white bold">Lista de staffs (Desenvolvimento)</span>
			<br />
			<Checkbox
				value={props.value.stafflist.active}
				label={'Ativar'}
				onChange={(v: boolean) => {
					const temp = { ...props.value };
					temp.stafflist.active = v;
					if (props.onChange) props.onChange(temp);
				}}
			/>
			{props.value.stafflist.active ? (
				<Folder open={false} label={'Configuração'}>
					<StaffListConfig
						value={props.value.stafflist}
						onChange={(v: StaffListOptions) => {
							const temp = { ...props.value };
							temp.stafflist = v;
							if (props.onChange) props.onChange(temp);
						}}
						guild={props.guild}
					/>
				</Folder>
			) : (
				<div />
			)}
		</div>
	);
}

export default FeatureEditor;
