import React from 'react';
import '../../styles/input.scss';
import { APIUserGuildsInfo } from '../../types/API';
import { CustomEmbed } from '../../types/Messages';
import SmallText from './SmallText';
import ColorPicker from './ColorPicker';
import { ColorResolvable } from 'discord.js';
import Checkbox from './Checkbox';
import MessageContentBuilder from './MessageContentBuilder';
import Embed from '../messages/Embed';
import { generateRandomId } from '../../utils/random';

function EmbedBuilder(props: {
	embed: CustomEmbed;
	onChange: Function | undefined;
	label: string | undefined;
	guild: APIUserGuildsInfo;
}) {
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
					onChange={(val: ColorResolvable) => {
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
				{props.embed?.fields.map((f) => {
					let index = props.embed?.fields.indexOf(f);
					return (
						<div key={generateRandomId(16)}>
							<span className="white">Campo {index === 0 || index ? index + 1 : 0}</span>
							<SmallText
								label="Título"
								onChange={(val: string) => {
									const temp = { ...props.embed };
									if (temp.fields) temp.fields[index ? index : 0].name = val;
									if (props.onChange) props.onChange(temp);
								}}
								value={props.embed?.fields.at(index ? index : 0)?.name}
							/>
							<MessageContentBuilder
								label="Texto"
								onChange={(val: string) => {
									const temp = { ...props.embed };
									if (temp.fields) temp.fields[index ? index : 0].label = val;
									if (props.onChange) props.onChange(temp);
								}}
								value={props.embed?.fields.at(index ? index : 0)?.label}
								guild={props.guild}
							/>
							<Checkbox
								label="Na mesma linha"
								onChange={(val: boolean) => {
									const temp = { ...props.embed };
									if (temp.fields) temp.fields[index ? index : 0].inLine = val;
									if (props.onChange) props.onChange(temp);
								}}
								value={
									props.embed?.fields[index ? index : 0].inLine as
										| boolean
										| undefined
								}
							/>
							<br />
							<button
								onClick={() => {
									const temp = { ...props.embed };
									temp.fields.splice(index ? index : 0, 1);
									if (props.onChange) props.onChange(temp);
								}}
							>
								Remover campo
							</button>
						</div>
					);
				})}
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
				<Embed embed={props.embed} />
			</div>
		</div>
	);
}

export default EmbedBuilder;
