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

function GuildFeatures(props: { guild: APIUserGuildsInfo }) {
	const [message, setMessage] = useState(createCustomMessage());
	const [messageId, setMessageId] = useState<string | undefined>(undefined);
	const [edicao, setEdicao] = useState<boolean>(false);
	const [features, setFeatures] = useState<
		{ status: number; features: Features } | undefined
	>(undefined);
	useEffect(() => {
		if (props.guild.member.permissions.includes('ADMINISTRATOR')) {
			getFeatures(setFeatures, props.guild.guild.id);
		}
	}, [props.guild.guild.id, props.guild.member.permissions]);
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
						<span className="bold white">Enviar anúncio!</span>
						{edicao ? (
							<span className="white bold">ESTÁS EM MODO EDIÇÃO!</span>
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
						<button onClick={() => {}}>Enviar</button>
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
							/>
							<button onClick={() => {}}>Guardar</button>
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
