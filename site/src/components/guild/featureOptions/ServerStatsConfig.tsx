import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { ServerStatsOptions } from '../../../types/Features';

function ServerStatsConfig(props: {
    value: ServerStatsOptions;
    onChange: (v: ServerStatsOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default ServerStatsConfig;