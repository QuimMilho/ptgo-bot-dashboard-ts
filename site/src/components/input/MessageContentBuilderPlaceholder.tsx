import React, { useState } from 'react';
import { APIUserGuildsInfo } from '../../types/API';
import { guildInfoToMentions, processMentions } from '../../utils/process';
import MessageContentBuilder from './MessageContentBuilder';
import '../../styles/input.scss';
import replaceString from 'string-placeholder';

function MessageContentBuilderPlaceholder(props: {
	value: string;
	onChange: (v: string) => void | undefined;
	guild: APIUserGuildsInfo;
	data: any;
}) {
	const [mentions] = useState(guildInfoToMentions(props.guild));
	return (
		<div className="messageContent">
			<div className="messageContentBuilderIn">
				<MessageContentBuilder
					guild={props.guild}
					label={undefined}
					onChange={(v: string) => {
						if (props.onChange) props.onChange(v);
					}}
					value={props.value}
				/>
			</div>
			{processMentions(
				replaceString(props.value, props.data, { before: '$', after: '$' }),
				mentions
			)}
		</div>
	);
}

export default MessageContentBuilderPlaceholder;
