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
				className="opener"
				onClick={() => (open ? setOpen(false) : setOpen(true))}
			>
				{props.label}
			</div>
			<div style={{ display: open ? 'flex' : 'none' }}>{props.children}</div>
		</div>
	);
}

export default Folder;
