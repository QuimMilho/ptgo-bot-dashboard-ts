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
	expires: Date | null;
	expired: boolean;
}

export interface BDPunitions {
	id: number;
	guildId: string;
	clientId: string;
	adminId: string;
	timeDone: Date;
	expires: Date | null;
	expired: boolean;
	reason: string | null;
	removeReason: string | null;
	removeAdminId: string | null;
	tipo: 'mute' | 'ban' | 'warning';
}