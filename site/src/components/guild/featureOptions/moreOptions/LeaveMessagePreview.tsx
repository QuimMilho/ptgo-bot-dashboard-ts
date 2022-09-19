import React, { useState } from 'react';
import { LeaveMessageMessageOptions } from '../../../../types/Features';
import replaceString from 'string-placeholder';
import { APIUserGuildsInfo } from '../../../../types/API';

function LeaveMessagePreview(props: {
	value: LeaveMessageMessageOptions;
	guild: APIUserGuildsInfo;
}) {
	const [data] = useState({
		serverName: props.guild.guild.name,
		memberName: props.guild.member.username,
		numberOfMembers: props.guild.guild.memberCount + 1,
	});
	const message = replaceString(props.value.imageMessage, data, {
		before: '$',
		after: '$',
	}).split('\n');
	return (
		<div
			style={{
				width: '500px',
				height: '281px',
				position: 'relative',
				margin: '0px',
				border: 'white 2px solid',
				borderRadius: '15px',
			}}
		>
			<img
				src={'/ptgo_background.jpeg'}
				style={{
					zIndex: -1,
					position: 'absolute',
					width: '100%',
					height: '100%',
					top: 0,
					borderRadius: '15px',
				}}
			/>
			<img
				src={'/logo.png'}
				style={{
					position: 'absolute',
					top: '50px',
					width: '100px',
					height: '100px',
					border: 'white solid 3px',
					borderRadius: '53px',
					right: '197px',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: '165px',
					color: 'white',
					fontWeight: 'bold',
					fontSize: '20px',
					textAlign: 'center',
					width: '100%',
					height: 'auto',
					left: 0,
				}}
			>
				<span style={{ fontSize: '35px' }}>{message[0]}</span>
				<br />
				<span>{message[1]}</span>
				<br />
				<span>{message[2]}</span>
				<br />
				<span>{message[3]}</span>
			</div>
		</div>
	);
}

export default LeaveMessagePreview;
