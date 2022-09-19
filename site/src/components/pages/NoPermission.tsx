import React from 'react';

function NoPermission() {
	return (
		<div className="content error">
            <h1>Não tens permissão para ver este conteúdo!</h1>
            <span>Se achas que é suposto conseguires ver esta página, fala com um administrador do discord!</span>
		</div>
	);
}

export default NoPermission;