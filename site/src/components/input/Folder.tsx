import React, { useState } from 'react';

function Folder(props: {
	children: JSX.Element;
	open: boolean;
	label: string | number | undefined;
}) {
	const [open, setOpen] = useState(props.open);
	return (
		<div className="folder">
			<div
				className="opener clickable"
				onClick={() => (open ? setOpen(false) : setOpen(true))}
			>
				<span className="white bold">{props.label}</span>
			</div>
			<div style={{ display: open ? 'flex' : 'none' }} className='openerData'>{props.children}</div>
		</div>
	);
}

export default Folder;
