import React, { useState } from 'react';
import { APIUserGuildsInfo } from '../../types/API';
import { guildInfoToMentions, processMentions } from '../../utils/process';
import MessageContentBuilder from './MessageContentBuilder';
import '../../styles/input.scss'; 

function MessageContentBuilderPreview(props: {
	value: string;
	onChange: (v: string) => void | undefined;
	guild: APIUserGuildsInfo;
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
			{processMentions(props.value, mentions)}
		</div>
	);
}

export default MessageContentBuilderPreview;
