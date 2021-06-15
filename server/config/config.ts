export const lConfig =
{
	listeningPort         : 7777,
	listeningRedirectPort : 7778,

	worker: {
		logLevel : 'warn',
		rtcMinPort : 40000,
		rtcMaxPort : 49999
	},

	webRtcTransport : {
		listenIps : [],
		maxIncomingBitrate              : 350000,
		initialAvailableOutgoingBitrate : 200000
	},

	databaseFile : '../data/database',
	roomStatusInterval: 300, // seconds
	publicDirectory : '../data/public/'
};
