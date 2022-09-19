import React, { useState } from 'react';
import {
	CustomEmbed,
	CustomEmbedAuthor,
	CustomEmbedField,
	CustomEmbedFooter,
	Mention,
} from '../../types/Messages';
import '../../styles/embed.scss';
import { processMentions } from '../../utils/process';
import replaceString from 'string-placeholder';

export interface EmbedProps {}

function Embed(props: {
	embed: CustomEmbed;
	mentions: Mention[];
	data: any | undefined;
}) {
	return (
		<div
			className="embed"
			style={{ borderLeft: `4px solid ${props.embed.color}` }}
		>
			<div className="embedLeftSide">
				<EmbedAuthor author={props.embed.author} />
				<EmbedTitle title={props.embed.title} url={props.embed.url} />
				<EmbedDescription
					description={props.embed.description}
					mentions={props.mentions}
					data={props.data}
				/>
				<EmbedFields
					fields={props.embed.fields}
					mentions={props.mentions}
					data={props.data}
				/>
				<EmbedImage image={props.embed.image} />
				<EmbedFooter
					footer={props.embed.footer}
					timeStamp={props.embed.timeStamp}
				/>
			</div>
			<div className="embedRightSide">
				<EmbedThumbnail thumbnail={props.embed.thumbnail} />
			</div>
		</div>
	);
}

export default Embed;

function EmbedAuthor(props: { author: CustomEmbedAuthor | null }) {
	if (props.author?.name) {
		if (props.author.url) {
			return (
				<div className="embedAuthor">
					{props.author.iconURL ? (
						<img src={props.author.iconURL} alt={'Imagem do autor'} />
					) : (
						<div />
					)}
					<a href={props.author.url}>{props.author.name}</a>
				</div>
			);
		} else {
			return (
				<div className="embedAuthor">
					{props.author.iconURL ? (
						<img src={props.author.iconURL} alt={'Imagem do autor'} />
					) : (
						<div />
					)}
					<span>{props.author.name}</span>
				</div>
			);
		}
	} else {
		return <div />;
	}
}

function EmbedTitle(props: { title: string | null; url: string | null }) {
	return props.title ? (
		props.url ? (
			<div className="embedTitle">
				<a href={props.url}>{props.title}</a>
			</div>
		) : (
			<div className="embedTitle">
				<span>{props.title}</span>
			</div>
		)
	) : (
		<div />
	);
}

function EmbedDescription(props: {
	description: string | null;
	mentions: Mention[];
	data: any | undefined;
}) {
	return props.description ? (
		<div className="embedDescription">
			{replaceString(props.description, props.data, { before: '$', after: '$' })
				.split('\n')
				.map((d) => (
					<p>{processMentions(d, props.mentions)}</p>
				))}
		</div>
	) : (
		<div />
	);
}

function EmbedFields(props: {
	fields: CustomEmbedField[];
	mentions: Mention[];
	data: any | undefined;
}) {
	let lines: CustomEmbedField[][] = [];
	let i = 0;
	while (i < props.fields.length) {
		let line: CustomEmbedField[] = [];
		let k = 0;
		if (props.fields[i].inLine) {
			do {
				line.push(props.fields[i]);
				i++;
				k++;
			} while (props.fields[i]?.inLine && k < 5);
		} else {
			line.push(props.fields[i]);
			i++;
		}
		lines.push(line);
	}
	return (
		<div className="embedFields">
			{lines.map((l) => (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: `repeat(${l.length}, 1fr)`,
					}}
					className="embedFieldLine"
				>
					{l.map((f) => (
						<div className="embedField">
							<h1>{f.name}</h1>
							{replaceString(f.label ? f.label : '', props.data, {
								before: '$',
								after: '$',
							})
								.split('\n')
								.map((l) => (
									<p>{processMentions(l, props.mentions)}</p>
								))}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

function EmbedImage(props: { image: string | null }) {
	if (props.image)
		return (
			<img className="embedImage" src={props.image} alt={'Imagem do embed'} />
		);
	return <div />;
}

function EmbedFooter(props: {
	footer: CustomEmbedFooter | null;
	timeStamp: boolean | Date | number | null;
}) {
	let timeStamp: string | null = null;
	if (props.timeStamp) {
		let stamp: Date | null = null;
		if (typeof props.timeStamp === 'boolean') {
			stamp = new Date();
		} else if (props.timeStamp instanceof Date) {
			stamp = props.timeStamp;
		} else if (typeof props.timeStamp === 'number') {
			stamp = new Date(props.timeStamp);
		} else {
			stamp = new Date();
		}
		timeStamp = stamp?.toLocaleString();
	}
	if (timeStamp && props.footer?.text) {
		return (
			<div className="embedFooter">
				{props.footer.iconURL ? (
					<img src={props.footer.iconURL} alt={'Imagem do rodapé'} />
				) : (
					<div />
				)}
				<span>{props.footer.text}</span>&nbsp; &#128900; &nbsp;
				<span>{timeStamp}</span>
			</div>
		);
	} else {
		if (timeStamp) {
			return (
				<div className="embedFooter">
					<span>{timeStamp}</span>
				</div>
			);
		} else {
			return (
				<div className="embedFooter">
					{props.footer?.iconURL ? (
						<img src={props.footer.iconURL} alt={'Imagem do rodapé'} />
					) : (
						<div />
					)}
					<span>{props.footer?.text}</span>
				</div>
			);
		}
	}
}

function EmbedThumbnail(props: { thumbnail: string | null }) {
	if (props.thumbnail)
		return (
			<img
				src={props.thumbnail}
				className="embedThumbnail"
				alt={'Imagem da thumbnail'}
			/>
		);
	return <div />;
}
