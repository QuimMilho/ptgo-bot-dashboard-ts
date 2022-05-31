export interface SimpleId {
	id: number;
}

export interface MySQLInvite {
	id: number;
	guildId: string;
	clientId: string;
	inviterId: string;
	inviteCode: string;
}
