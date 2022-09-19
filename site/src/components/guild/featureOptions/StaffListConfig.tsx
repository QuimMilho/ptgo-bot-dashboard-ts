import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { StaffListOptions } from '../../../types/Features';

function StaffListConfig(props: {
    value: StaffListOptions;
    onChange: (v: StaffListOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default StaffListConfig;