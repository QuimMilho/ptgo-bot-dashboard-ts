import React from 'react';
import '../../styles/input.scss';
import { APIUserGuildsInfo } from '../../types/API';
import { CustomEmbed } from '../../types/Messages';
import SmallText from './SmallText';
import ColorPicker from './ColorPicker';
import Checkbox from './Checkbox';
import MessageContentBuilder from './MessageContentBuilder';
import Embed from '../messages/Embed';
import { guildInfoToMentions } from '../../utils/process';

function EmbedBuilder(props: {
	embed: CustomEmbed;
	onChange: ((v: CustomEmbed) => void) | undefined;
	label: string | undefined;
	guild: APIUserGuildsInfo;
	data: any | undefined;
}) {
	if (!props.embed.color) {
		const temp = { ...props.embed };
		temp.color = '#202225';
		props.embed.color = '#202225';
		if (props.onChange) props.onChange(temp);
	}
	return (
		<div className="embedBuilder">
			<div className="embedBuilderInfo">
				<span className="bold white">Autor do Embed</span>
				<br />
				<SmallText
					label="Nome do autor"
					value={props.embed?.author?.name}
					onChange={(val: string) => {
						const temp = { ...props.embed };
						if (!temp.author)
							temp.author = { iconURL: null, name: '', url: null };
						temp.author.name = val;
						if (props.onChange) props.onChange(temp);
					}}
				/>
				<SmallText
					label="URL"
					value={props.embed?.author?.url}
					onChange={(val: string) => {
						const temp = { ...props.embed };
						if (!temp.author)
							temp.author = { iconURL: null, name: '', url: null };
						temp.author.url = val;
						if (props.onChange) props.onChange(temp);
					}}
				/>
				<SmallText
					label="Icon do autor"
					value={props.embed?.author?.iconURL}
					onChange={(val: string) => {
						const temp = { ...props.embed };
						if (!temp.author)
							temp.author = { iconURL: null, name: '', url: null };
						temp.author.iconURL = val;
						if (props.onChange) props.onChange(temp);
					}}
				/>
				<span className="bold white">Título do Embed</span>
				<br />
				<SmallText
					label="Título"
					value={props.embed?.title}
					onChange={(val: string) => {
						const temp = { ...props.embed };
						temp.title = val;
						if (props.onChange) props.onChange(temp);
					}}
				/>
				<SmallText
					label="URL"
					value={props.embed?.url}
					onChange={(val: string) => {
						const temp = { ...props.embed };
						temp.url = val;
						if (props.onChange) props.onChange(temp);
					}}
				/>
				<span className="bold white">Thumbnail</span>
				<SmallText
					label="Thumbnail"
					onChange={(val: string) => {
						const temp = { ...props.embed };
						temp.thumbnail = val;
						if (props.onChange) props.onChange(temp);
					}}
					value={props.embed?.thumbnail}
				/>
				<span className="bold white">Cor do embed</span>
				<ColorPicker
					color={props.embed?.color as string}
					onChange={(val: string) => {
						const temp = { ...props.embed };
						temp.color = val;
						if (props.onChange) props.onChange(temp);
					}}
				/>
				<span className="bold white">Descrição do Embed</span>
				<MessageContentBuilder
					label={undefined}
					onChange={(val: string) => {
						const temp = { ...props.embed };
						temp.description = val;
						if (props.onChange) props.onChange(temp);
					}}
					value={props.embed?.description}
					guild={props.guild}
				/>
				<span className="bold white">Campos do Embed</span>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={0}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={1}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={2}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={3}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={4}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={5}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={6}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={7}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={8}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={9}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={10}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={11}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={12}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={13}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={14}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={15}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={16}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={17}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={18}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={19}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={20}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={21}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={22}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={23}
					onChange={props.onChange}
				/>
				<EmbedFieldBuilder
					embed={props.embed}
					guild={props.guild}
					index={24}
					onChange={props.onChange}
				/>
				<br />
				<button
					onClick={() => {
						const temp = { ...props.embed };
						if (temp.fields.length >= 25)
							return window.alert('Atingiste o número máximo de campos!');
						temp.fields?.push({ inLine: false, label: '', name: '' });
						if (props.onChange) props.onChange(temp);
					}}
				>
					Adicionar campo
				</button>
				<br />
				<span className="bold white">Rodapé do Embed</span>
				<MessageContentBuilder
					label="Texto"
					onChange={(val: string) => {
						const temp = { ...props.embed };
						if (!temp.footer) temp.footer = { iconURL: null, text: null };
						temp.footer.text = val;
						if (props.onChange) props.onChange(temp);
					}}
					value={props.embed?.footer?.text}
					guild={props.guild}
				/>
				<SmallText
					label="URL do icon"
					onChange={(val: string) => {
						const temp = { ...props.embed };
						if (!temp.footer) temp.footer = { iconURL: null, text: null };
						temp.footer.iconURL = val;
						if (props.onChange) props.onChange(temp);
					}}
					value={props.embed?.footer?.iconURL}
				/>
				<Checkbox
					label="Ativar estampa de tempo"
					onChange={(val: boolean) => {
						const temp = { ...props.embed };
						temp.timeStamp = val ? new Date() : null;
						if (props.onChange) props.onChange(temp);
					}}
					value={props.embed?.timeStamp ? true : false}
				/>
			</div>
			<div className="embedBuilderPreview">
				<Embed
					embed={props.embed}
					mentions={guildInfoToMentions(props.guild)}
					data={props.data}
				/>
			</div>
		</div>
	);
}

export default EmbedBuilder;

function EmbedFieldBuilder(props: {
	onChange: Function | undefined;
	embed: CustomEmbed;
	guild: APIUserGuildsInfo;
	index: number;
}) {
	return props.embed.fields[props.index] ? (
		<div>
			<span className="white">Campo {props.index + 1}</span>
			<SmallText
				label="Título"
				onChange={(val: string) => {
					const temp = { ...props.embed };
					if (temp.fields) temp.fields[props.index].name = val;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.embed?.fields.at(props.index)?.name}
			/>
			<MessageContentBuilder
				label="Texto"
				onChange={(val: string) => {
					const temp = { ...props.embed };
					if (temp.fields) temp.fields[props.index].label = val;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.embed?.fields.at(props.index)?.label}
				guild={props.guild}
			/>
			<Checkbox
				label="Na mesma linha"
				onChange={(val: boolean) => {
					const temp = { ...props.embed };
					if (temp.fields) temp.fields[props.index].inLine = val;
					if (props.onChange) props.onChange(temp);
				}}
				value={props.embed?.fields[props.index].inLine as boolean | undefined}
			/>
			<br />
			<button
				onClick={() => {
					const temp = { ...props.embed };
					temp.fields.splice(props.index, 1);
					if (props.onChange) props.onChange(temp);
				}}
			>
				Remover campo
			</button>
		</div>
	) : (
		<div />
	);
}
