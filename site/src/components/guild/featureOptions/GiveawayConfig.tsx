import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { GiveAwayOptions } from '../../../types/Features';

function GiveawayConfig(props: {
    value: GiveAwayOptions;
    onChange: (v: GiveAwayOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default GiveawayConfig;