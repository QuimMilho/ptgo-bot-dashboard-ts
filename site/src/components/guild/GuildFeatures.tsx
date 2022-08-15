import React from 'react';
import { APIUserGuildsInfo, APIUserInfo } from '../../types/API';
import { createCustomMessage } from '../../utils/createObjects';
import Folder from '../input/Folder';
import MessageBuilder from '../input/MessageBuilder';

function GuildFeatures(props: { guild: APIUserGuildsInfo }) {
	return (
		<div className="content">
			<Folder label={'teste'} open={false}>
				<MessageBuilder
					guild={props.guild}
					label={undefined}
					onChange={undefined}
					value={createCustomMessage()}
				/>
			</Folder>
		</div>
	);
}

export default GuildFeatures;
