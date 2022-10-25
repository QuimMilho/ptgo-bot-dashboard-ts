export interface DBUser {
	id: number;
	clientId: string;
	token: string;
	refreshToken: string;
	avatar: string;
	tag: string;
}

export interface DBPermaRoles {
	id: number;
	guildId: string;
	clientId: string;
	roleId: string;
	timeDone: Date;
	expires: Date;
	expired: boolean;
}

export interface BDPunitions {
	id: number;
	guildId: string;
	clientId: string;
	adminId: string;
	timeDone: Date;
	expires: Date;
	expired: boolean;
	reason: string;
	tipo: 'mute' | 'ban' | 'warning';
}