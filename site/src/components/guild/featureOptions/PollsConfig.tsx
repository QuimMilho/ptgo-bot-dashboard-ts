import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { PollOptions } from '../../../types/Features';

function PollsConfig(props: {
    value: PollOptions;
    onChange: (v: PollOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default PollsConfig;