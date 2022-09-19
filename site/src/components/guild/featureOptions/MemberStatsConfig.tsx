import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { MemberStatsOptions } from '../../../types/Features';

function MemberStatsConfig(props: {
    value: MemberStatsOptions;
    onChange: (v: MemberStatsOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default MemberStatsConfig;