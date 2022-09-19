import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { ReactionRoleOptions } from '../../../types/Features';

function ReactionRoleConfig(props: {
    value: ReactionRoleOptions;
    onChange: (v: ReactionRoleOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default ReactionRoleConfig;