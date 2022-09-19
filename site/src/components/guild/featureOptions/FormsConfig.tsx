import React from 'react';
import { APIUserGuildsInfo } from '../../../types/API';
import { FormOptions } from '../../../types/Features';

function FormsConfig(props: {
    value: FormOptions;
    onChange: (v: FormOptions) => void | undefined;
    guild: APIUserGuildsInfo;
}) {
    return <div className="widthMax"></div>;
}

export default FormsConfig;