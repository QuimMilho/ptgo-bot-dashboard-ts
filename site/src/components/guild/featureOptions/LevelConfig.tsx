import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { LevelOptions } from '../../../types/Features';

function LevelConfig(props: {
	value: LevelOptions;
	onChange: (v: LevelOptions) => void | undefined;
	guild: APIUserGuildsInfo;
}) {
	return <div className="widthMax"></div>;
}

export default LevelConfig;