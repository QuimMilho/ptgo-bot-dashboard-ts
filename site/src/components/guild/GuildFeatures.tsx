import React, { useEffect, useState } from 'react';
import { APIUserGuildsInfo } from '../../types/API';
import { Features } from '../../types/Features';
import { createCustomMessage } from '../../utils/createObjects';
import Folder from '../input/Folder';
import MessageBuilder from '../input/MessageBuilder';
import SmallText from '../input/SmallText';
import Loading from '../pages/Loading';
import NoPermission from '../pages/NoPermission';
import FeatureEditor from './FeatureEditor';
import APIURL from '../../index';
import axios from 'axios';
import Select from 'react-select';
import TextChannelSelect from '../selects/single/TextChannelSelect';
import { warn } from '../../App';

function GuildFeatures(props: {
	guild: APIUserGuildsInfo;
	guilds: APIUserGuildsInfo[];
}) {
	console.log(props.guild);
	const [message, setMessage] = useState(createCustomMessage());
	const [messageId, setMessageId] = useState<string | undefined>(undefined);
	const [edicao, setEdicao] = useState<boolean>(false);
	const [features, setFeatures] = useState<
		{ status: number; features: Features } | undefined
	>(undefined);
	const [func, setFunc] = useState<undefined | string>(undefined);
	const [anounceId, setAnounceId] = useState<null | string>(null);
	useEffect(() => {
		if (props.guild.member.permissions.includes('ADMINISTRATOR')) {
			getFeatures(setFeatures, props.guild.guild.id);
		}
	}, [props.guild.guild.id, props.guild.member.permissions]);
	const opt: { value: string; label: string }[] = [];
	if (features?.features.moderation)
		opt.push({ label: 'Verificação', value: 'verify' });
	if (features?.features.forms)
		for (let i = 0; i < features.features.forms.forms.length; i++) {
			const f = features.features.forms.forms[i];
			opt.push({ value: f.id, label: `Formulário ${f.name}` });
		}
	return (
		<div className="content">
			{/* Anúncios */}
			{props.guild.member.permissions.includes('ADMINISTRATOR') ||
			props.guild.member.permissions.includes('ANOUNCEMENTS') ? (
				<Folder label={'Anúncios'} open={true}>
					<div className="flex widthMax">
						<span className="bold white">Editar anúncio!</span>
						<br />
						<span className="white">
							Cola o id da mensagem na caixa de texto e clica em Procurar!
						</span>
						<SmallText
							label={undefined}
							onChange={setMessageId}
							value={messageId}
						/>
						<button
							onClick={() => {
								setEdicao(true);
							}}
						>
							Procurar
						</button>
						<br />
						<span className="white bold">Funcionalidades extra</span>
						<br />
						<Select
							options={opt}
							isClearable={true}
							isMulti={false}
							placeholder={'Funcionalidades extra'}
							value={opt.find((o) => o.value === func)}
							onChange={(v) => {
								setFunc(v?.value);
							}}
						/>
						<br />
						<span className='white bold'>Canal a enviar</span>
						<br />
						<TextChannelSelect
							channels={props.guild.guild.channels}
							clearable={false}
							onChange={(v) => {
								setAnounceId(v);
							}}
							value={anounceId}
						/>
						<br />
						<span className="bold white">Enviar anúncio!</span>
						<br />
						{edicao ? (
							<span className="white bold">
								<br />
								ESTÁS EM MODO EDIÇÃO!
								<br />
							</span>
						) : undefined}
						<MessageBuilder
							guild={props.guild}
							label={undefined}
							onChange={setMessage}
							value={message}
						/>
						{edicao ? (
							<div>
								<span className="white bold">ESTÁS EM MODO EDIÇÃO!</span>
								<br />
								<span className="white">
									Para sair tens de dar reload à página!
								</span>
							</div>
						) : undefined}
						<button onClick={() => {warn('teste', 'teste123 grande texto!')}}>Enviar</button>
					</div>
				</Folder>
			) : undefined}
			{/* Features */}
			{props.guild.member.permissions.includes('ADMINISTRATOR') ? (
				<Folder label={'Features'} open={false}>
					{features ? (
						<div className="widthMax">
							<FeatureEditor
								value={features.features}
								onChange={(v: Features) => {
									const temp = { ...features };
									temp.features = v;
									setFeatures(temp);
								}}
								guild={props.guild}
								guilds={props.guilds}
							/>
							<br />
							<br />
							<button
								onClick={() => {
									APISetFeaures(features.features, props.guild.guild.id);
								}}
							>
								Guardar
							</button>
						</div>
					) : (
						<Loading />
					)}
				</Folder>
			) : undefined}
			{/* Sem perms */}
			{!props.guild.member.permissions.includes('ADMINISTRATOR') &&
			!props.guild.member.permissions.includes('ANOUNCEMENTS') ? (
				<NoPermission />
			) : undefined}
		</div>
	);
}

export default GuildFeatures;

async function getFeatures(setFeatures: Function, id: string) {
	const info = await axios({
		method: 'GET',
		url: `${APIURL}/api/guild/features/${id}`,
		withCredentials: true,
	});
	setFeatures({ status: info.status, features: info.data });
}

async function APISetFeaures(features: Features, id: string) {
	const info = await axios({
		method: 'POST',
		url: `${APIURL}/api/guild/features/${id}`,
		withCredentials: true,
		data: features,
	});
}
