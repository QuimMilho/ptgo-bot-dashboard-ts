import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { ServerListOptions } from '../../../types/Features';

function ServerListConfig(props: {
    value: ServerListOptions;
    onChange: (v: ServerListOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default ServerListConfig;