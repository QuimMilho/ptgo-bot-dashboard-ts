import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { AnounceOptions } from '../../../types/Features';

function AnouncementsConfig(props: {
    value: AnounceOptions;
    onChange: (v: AnounceOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default AnouncementsConfig;