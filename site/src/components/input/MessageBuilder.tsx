import React from 'react';
import '../../styles/input.scss';
import { APIUserGuildsInfo, GuildInfo } from '../../types/API';
import { CustomEmbed, Messages } from '../../types/Messages';
import MessageContentBuilder from './MessageContentBuilder';
import { createCustomEmbed } from '../../utils/createObjects';
import EmbedBuilder from './EmbedBuilder';
import { generateRandomId } from '../../utils/random';

function MessageBuilder(props: {
	value: Messages;
	onChange: Function | undefined;
	label: string | undefined;
	guild: APIUserGuildsInfo;
}) {
	const message: Messages = { buttons: [], content: '', embeds: [], files: [] };
	return (
		<div className="messageBuilder">
			<span className="white bold">Texto</span>
			<div className="messageContent">
				<MessageContentBuilder
					guild={props.guild}
					label={undefined}
					onChange={(v: string) => {
						const temp = { ...props.value };
						temp.content = v;
						if (props.onChange) props.onChange(temp);
					}}
					value={props.value?.content}
				/>
			</div>
			<span className="white bold">Embeds</span>
			<div className="messageEmbeds">
				{props.value.embeds[0] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[0]}
							guild={props.guild}
							label={`Embed 1`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[0] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(0, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[1] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[1]}
							guild={props.guild}
							label={`Embed 2`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[1] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(1, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[2] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[2]}
							guild={props.guild}
							label={`Embed 3`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[2] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(2, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[3] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[3]}
							guild={props.guild}
							label={`Embed 4`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[3] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(3, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[4] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[4]}
							guild={props.guild}
							label={`Embed 5`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[4] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(4, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[5] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[5]}
							guild={props.guild}
							label={`Embed 6`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[5] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(5, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[6] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[6]}
							guild={props.guild}
							label={`Embed 7`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[6] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(6, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[7] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[7]}
							guild={props.guild}
							label={`Embed 8`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[7] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(7, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[8] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[8]}
							guild={props.guild}
							label={`Embed 9`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[8] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(8, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				{props.value.embeds[9] ? (
					<div>
						<EmbedBuilder
							embed={props.value.embeds[9]}
							guild={props.guild}
							label={`Embed 10`}
							onChange={(v: CustomEmbed) => {
								const temp = { ...props.value };
								if (temp.embeds) temp.embeds[9] = v;
								if (props.onChange) props.onChange(temp);
							}}
						/>
						<button
							onClick={() => {
								const temp = { ...props.value };
								temp.embeds.splice(9, 1);
								if (props.onChange) props.onChange(temp);
							}}
						>
							Remover Embed
						</button>
					</div>
				) : undefined}
				<button
					onClick={() => {
						const temp = { ...props.value };
						if (temp.embeds.length >= 10)
							return window.alert('Atingiste o número máximo de embeds!');
						temp.embeds?.push(createCustomEmbed());
						if (props.onChange) props.onChange(temp);
					}}
				>
					Adicionar Embed
				</button>
			</div>
			<span className="white bold">Ficheiros</span>
			<div className="messageFiles white">Em breve</div>
		</div>
	);
}

export default MessageBuilder;
