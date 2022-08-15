import React from 'react';
import { TwitterPicker } from 'react-color';

function ColorPicker(props: {color: string, onChange: Function}) {
	return (
		<div>
			<div
				style={{
					backgroundColor: props.color,
					width: 35,
					height: 35,
					border: '3px white solid',
					borderRadius: 5,
					marginBottom: 8,
				}}
			/>
			<TwitterPicker
				color={props.color}
				colors={[
					'#ff0000',
					'#ffff00',
					'#00ff00',
					'#00ffff',
					'#0000ff',
					'#ff00ff',
					'#202225',
					'#7F00FF',
					'#FF7F00',
					'#007FFF',
					'#7F7F7F',
					'#FF66FF',
					'#6666FF',
					'#FF6666',
					'#7FFF00',
				]}
				onChange={(color, event) => {
					props.onChange(color.hex);
				}}
			/>
		</div>
	);
}

export default ColorPicker;