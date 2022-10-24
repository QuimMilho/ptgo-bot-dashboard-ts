import React, { useState } from 'react';
import Select from 'react-select';
import { APIUserGuildsInfo, ChannelInfo } from '../../../../types/API';
import {
	FormsOptions,
} from '../../../../types/Features';
import {
	createFormButton,
	createFormQuestion,
} from '../../../../utils/createObjects';
import ButtonBuilder from '../../../input/ButtonBuilder';
import Checkbox from '../../../input/Checkbox';
import ColorPicker from '../../../input/ColorPicker';
import Folder from '../../../input/Folder';
import MessageBuilder from '../../../input/MessageBuilder';
import SmallNumber from '../../../input/SmallNumber';
import SmallText from '../../../input/SmallText';
import MultipleRoleSelect from '../../../selects/multiple/MultipleRoleSelect';
import GuildSelect from '../../../selects/single/GuildSelect';
import TextChannelSelect from '../../../selects/single/TextChannelSelect';

const questionsOpt: { label: string; value: 'STRING' | 'URL' }[] = [
	{ label: 'Texto', value: 'STRING' },
	{ label: 'Link', value: 'URL' },
];

const buttonOpt: {
	label: string;
	value: 'SEND_DM' | 'SEND_MESSAGE' | 'SEND_FORM';
}[] = [
	{ label: 'Enviar mensagem pelas DMS', value: 'SEND_DM' },
	{ label: 'Enviar mensagem para canal', value: 'SEND_MESSAGE' },
	{ label: 'Enviar resposta para canal', value: 'SEND_FORM' },
];

function FormConfig(props: {
	form: FormsOptions;
	onChange: (v: FormsOptions) => void | undefined;
	guild: APIUserGuildsInfo;
	guilds: APIUserGuildsInfo[];
	delete: () => void | undefined;
}) {
	const [form, setForm] = useState({ ...props.form });
	const [ansGuild, setAnsGuild] = useState<
		APIUserGuildsInfo | undefined | null
	>(null);
	const [ansChannel, setAnsChannel] = useState<ChannelInfo | undefined | null>(
		null
	);
	return (
		<div className="widthMax">
			<span className="white small">Id: {props.form.id}</span>
			<br />
			<span className="white bold">Nome do formulário</span>
			<br />
			<br />
			<SmallText
				onChange={(v) => {
					const temp = { ...form };
					temp.name = v;
					setForm(temp);
				}}
				value={form.name}
				label={undefined}
			/>
			<br />
			<br />
			<span className="white bold">Delays</span>
			<br />
			<span className="white">Delay após resposta</span>
			<br />
			<span className="white">Em minutos</span>
			<SmallNumber
				min={0}
				max={43200}
				label={undefined}
				onChange={(v) => {
					const temp = { ...form };
					temp.answerDelay = v;
					setForm(temp);
				}}
				value={form.answerDelay}
			/>
			<br />
			<span className="white">Delay após resposta sem sucesso</span>
			<br />
			<span className="white">Em minutos</span>
			<SmallNumber
				min={0}
				max={43200}
				label={undefined}
				onChange={(v) => {
					const temp = { ...form };
					temp.delay = v;
					setForm(temp);
				}}
				value={form.delay}
			/>
			<br />
			<br />
			<span className="white bold">Roles</span>
			<br />
			<span className="white">Roles proíbidas de responder</span>
			<MultipleRoleSelect
				clearable={true}
				onChange={(v) => {
					const temp = { ...form };
					temp.blockedRoles = v;
					setForm(temp);
				}}
				roles={props.guild.guild.roles}
				value={form.blockedRoles}
			/>
			<br />
			<br />
			<span className="white bold">Respostas</span>
			<br />
			<span className="white">
				Canal atual:{' '}
				<span className="small">
					Guild <span className="bold">|</span> Canal
				</span>
				<br />
				{form.responseChat.guild.name} <span className="bold">|</span>{' '}
				{form.responseChat.channel.name}
			</span>
			<br />
			<br />
			<span className="white">Guild onde aparecem as respostas</span>
			<GuildSelect
				clearable={false}
				guilds={props.guilds.filter((g) =>
					g.member.permissions.includes('ADMINISTRATOR')
				)}
				onChange={(v) => {
					setAnsGuild(props.guilds.find((g) => g.guild.id === v));
				}}
				value={ansGuild?.guild.id ? ansGuild.guild.id : null}
			/>
			<br />
			<span className="white">Canal onde aparecem as respostas</span>
			<TextChannelSelect
				channels={ansGuild?.guild.channels ? ansGuild?.guild.channels : []}
				clearable={false}
				onChange={(v) => {
					setAnsChannel(ansGuild?.guild.channels.find((c) => c.id === v));
				}}
				value={ansChannel?.id ? ansChannel?.id : null}
			/>
			<br />
			<button
				onClick={() => {
					const temp = { ...form };
					temp.responseChat = {
						channel: {
							id: ansChannel ? ansChannel.id : '',
							name: ansChannel ? ansChannel.name : '',
						},
						guild: {
							id: ansGuild ? ansGuild.guild.id : '',
							name: ansGuild ? ansGuild.guild.name : '',
						},
					};
					console.log(temp, ansGuild, ansChannel);
					setForm(temp);
				}}
			>
				Selecionar canal
			</button>
			<br />
			<br />
			<Checkbox
				label="Auto reagir com emojis (Sim, Não, Talvez)"
				onChange={(v) => {
					const temp = { ...form };
					temp.emojis = v;
					setForm(temp);
				}}
				value={form.emojis}
			/>
			<br />
			<br />
			<Folder label={'Cores'} open={false}>
				<div className="widthMax">
					<span className="white">Cor da introdução</span>
					<br />
					<ColorPicker
						color={form.introColor as string}
						onChange={(v) => {
							const temp = { ...form };
							temp.introColor = v;
							setForm(temp);
						}}
					/>
					<br />
					<br />
					<span className="white">Cor das perguntas</span>
					<br />
					<ColorPicker
						color={form.questionColor as string}
						onChange={(v) => {
							const temp = { ...form };
							temp.questionColor = v;
							setForm(temp);
						}}
					/>
					<br />
					<br />
					<span className="white">Cor da resposta final</span>
					<br />
					<ColorPicker
						color={form.responseColor as string}
						onChange={(v) => {
							const temp = { ...form };
							temp.responseColor = v;
							setForm(temp);
						}}
					/>
				</div>
			</Folder>
			<br />
			<Folder label={'Perguntas'} open={false}>
				<div className="widthMax">
					{form.questions.map((q) => (
						<div>
							<span className="white bold">Pergunta nº {q.index + 1}</span>
							<br />
							<br />
							<span className="white">Tipo da pergunta</span>
							<Select
								options={questionsOpt}
								isClearable={false}
								onChange={(v) => {
									const temp = { ...form };
									temp.questions[q.index].type = v?.value
										? (v.value as 'STRING' | 'URL')
										: 'STRING';
									setForm(temp);
								}}
								value={questionsOpt.find((v) => v.value === q.type)}
							/>
							<br />
							<span className="white">Texto da pergunta</span>
							<br />
							<SmallText
								label={undefined}
								onChange={(v) => {
									const temp = { ...form };
									temp.questions[q.index].question = v;
									setForm(temp);
								}}
								value={q.question}
							/>
							<br />
							<button
								onClick={() => {
									const temp = { ...form };
									temp.questions.splice(q.index, 1);
									for (let i = 0; i < temp.questions.length; i++) {
										temp.questions[i].index = i;
									}
									setForm(temp);
								}}
							>
								Apagar pergunta
							</button>
						</div>
					))}
					<br />
					<button
						onClick={() => {
							const temp = { ...form };
							if (temp.questions.length < 25)
								temp.questions.push(createFormQuestion(temp.questions.length));
							setForm(temp);
						}}
					>
						Adicionar pergunta
					</button>
				</div>
			</Folder>
			<br />
			<Folder label={'Botões da resposta'} open={false}>
				<div className="widthMax">
					{form.buttons.map((b) => (
						<div>
							<span className="white bold">Botão nº {b.index + 1}</span>
							<br />
							<br />
							<span className="white">Configuração do botão</span>
							<br />
							<ButtonBuilder
								value={{ label: b.label, style: b.type }}
								onChange={(v) => {
									const temp = { ...form };
									temp.buttons[b.index].type = v.style;
									temp.buttons[b.index].label = v.label;
									setForm(temp);
								}}
							/>
							<br />
							<span className="white">Função do botão</span>
							<br />
							<Select
								options={buttonOpt}
								isClearable={false}
								value={buttonOpt.find((v) => v.value === b.function)}
								onChange={(v) => {
									const temp = { ...form };
									temp.buttons[b.index].function = v?.value
										? v.value
										: 'SEND_DM';
									setForm(temp);
								}}
							/>
							<br />
							{form.buttons[b.index].function !== 'SEND_DM' ? (
								<div className="widthMax">
									<span className="white bold">Canal a enviar a mensagem</span>
									<TextChannelSelect
										clearable={true}
										onChange={(v) => {
											const temp = { ...form };
											temp.buttons[b.index].channel = v;
											setForm(temp);
										}}
										channels={props.guild.guild.channels}
										value={form.buttons[b.index].channel}
									/>
								</div>
							) : undefined}
							{form.buttons[b.index].function !== 'SEND_FORM' ? (
								<Folder label={'Mensagem a enviar'} open={true}>
									<div className="widthMax">
										<span className="white bold">Placeholders</span>
										<br />
										<span className="white small">
											<span className="bold">
												NOTA: Os placeholders de menções apenas funcionam no
												conteúdo da mensagem e em descrições e campos de embeds
											</span>
											<br />
										</span>
										<br />
										<span className="white bold">Mensagem</span>
										<br />
										<MessageBuilder
											guild={props.guild}
											label={undefined}
											onChange={(v) => {
												const temp = { ...form };
												temp.buttons[b.index].message = v;
												setForm(temp);
											}}
											value={form.buttons[b.index].message}
										/>
									</div>
								</Folder>
							) : undefined}
							<span className="white bold">Roles permitidas a interagir</span>
							<br />
							<MultipleRoleSelect
								clearable={true}
								onChange={(v) => {
									const temp = { ...form };
									temp.buttons[b.index].roles = v;
									setForm(temp);
								}}
								roles={props.guild.guild.roles}
								value={form.buttons[b.index].roles}
							/>
							<br />
							<span className="white bold">Após a interação</span>
							<br />
							<br />
							<Checkbox
								label="Apagar resposta"
								onChange={(v) => {
									const temp = { ...form };
									temp.buttons[b.index].deleteAfter = v;
									setForm(temp);
								}}
								value={form.buttons[b.index].deleteAfter}
							/>
							<br />
							<br />
							{!form.buttons[b.index].deleteAfter ? (
								<Checkbox
									label="Desativar botões"
									onChange={(v) => {
										const temp = { ...form };
										temp.buttons[b.index].disableAfter = v;
										setForm(temp);
									}}
									value={form.buttons[b.index].disableAfter}
								/>
							) : undefined}
							<br />
							<br />
							<button
								onClick={() => {
									const temp = { ...form };
									temp.buttons.splice(b.index, 1);
									setForm(temp);
								}}
							>
								Apagar botão
							</button>
						</div>
					))}
					<br />
					<button
						onClick={() => {
							const temp = { ...form };
							if (temp.buttons.length < 5)
								temp.buttons.push(createFormButton(form.buttons.length));
							setForm(temp);
						}}
					>
						Adicionar botão
					</button>
				</div>
			</Folder>
			<br />
			<button onClick={() => props.onChange(form)}>Guardar formulário</button>
			<button onClick={() => setForm(props.form)}>Reset ao guardado</button>
			<button
				onClick={() => {
					if (props.delete) props.delete();
				}}
			>
				Apagar formulário
			</button>
		</div>
	);
}

export default FormConfig;
