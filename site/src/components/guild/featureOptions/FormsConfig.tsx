import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import {
	FormOptions,
} from '../../../types/Features';
import { createForm } from '../../../utils/createObjects';
import Folder from '../../input/Folder';
import MultipleRoleSelect from '../../selects/multiple/MultipleRoleSelect';
import MultipleTextChannelSelect from '../../selects/multiple/MultipleTextChannelSelect';
import FormConfig from './moreOptions/FormConfig';

function FormsConfig(props: {
	value: FormOptions;
	onChange: (v: FormOptions) => void | undefined;
	guild: APIUserGuildsInfo;
	guilds: APIUserGuildsInfo[];
}) {
	return (
		<div className="widthMax">
			<span className="white bold">Roles e Canais</span>
			<br />
			<br />
			<span className="white">Manager roles</span>
			<br />
			<MultipleRoleSelect
				clearable={true}
				onChange={(v) => {
					const temp = { ...props.value };
					temp.managerRoles = v;
					if (props.onChange) props.onChange(temp);
				}}
				roles={props.guild.guild.roles}
				value={props.value.managerRoles}
			/>
			<br />
			<span className="white">Logs</span>
			<br />
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
			<br />
			<br />
			<Folder label={'Formulários'} open={false}>
				<div className="widthMax">
					{props.value.forms.map((f) => (
						<Folder label={f.name} open={false}>
							<FormConfig
								form={f}
								onChange={(v) => {
									const temp = { ...props.value };
									let index = 0;
									for (index; index < props.value.forms.length; index++) {
										if (f.id === props.value.forms[index].id) break;
									}
									temp.forms[index] = v;
									if (props.onChange) props.onChange(temp);
								}}
								guild={props.guild}
								guilds={props.guilds}
								delete={() => {
									const temp = { ...props.value };
									let index = 0;
									for (index; index < props.value.forms.length; index++) {
										if (f.id === props.value.forms[index].id) break;
									}
									temp.forms.splice(index, 1);
									if (props.onChange) props.onChange(temp);
								}}
							/>
						</Folder>
					))}
					<br />
					<button
						onClick={() => {
							const temp = { ...props.value };
							temp.forms.push(createForm());
							if (props.onChange) props.onChange(temp);
						}}
					>
						Adicionar formulário
					</button>
				</div>
			</Folder>
		</div>
	);
}

export default FormsConfig;
