import React from 'react';
import {
	CustomEmbed,
	CustomEmbedAuthor,
	CustomEmbedField,
} from '../../types/Messages';
import '../../styles/embed.scss';

export interface EmbedProps {
	embed: CustomEmbed;
}

function Embed(props: EmbedProps) {
	return (
		<div
			className="embed"
			style={{ borderLeft: `4px solid ${props.embed.color}` }}
		>
			<div className="embedLeftSide">
				<EmbedAuthor author={props.embed.author} />
				<EmbedTitle title={props.embed.title} url={props.embed.url} />
				<EmbedDescription description={props.embed.description} />
				<EmbedFields fields={props.embed.fields} />
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
					{props.author.iconURL ? <img src={props.author.iconURL} /> : <div />}
					<a href={props.author.url}>{props.author.name}</a>
				</div>
			);
		} else {
			return (
				<div className="embedAuthor">
					{props.author.iconURL ? <img src={props.author.iconURL} /> : <div />}
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

function EmbedDescription(props: { description: string | null }) {
	return props.description ? (
		<div className="embedDescription">
			{props.description.split('\n').map((d) => (
				<p>{d}</p>
			))}
		</div>
	) : (
		<div />
	);
}

function EmbedFields(props: { fields: CustomEmbedField[] }) {
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
							{f.label.split('\n').map((l) => (
								<p>{l}</p>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

function EmbedImage(props: {image: string | null}) {
	
}

function EmbedThumbnail(props: { thumbnail: string | null }) {
	if (props.thumbnail) return <img src={props.thumbnail} className='embedThumbnail' />;
	return <div />;
}
