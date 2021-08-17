export const lConfig =
{
	listeningPort         : 7777,

	worker: {
		logLevel : 'warn',
		rtcMinPort : 40000,
		rtcMaxPort : 49999
	},

	webRtcTransport : {
		listenIps : [{
		  ip: '127.0.0.1'
    }],
		maxIncomingBitrate              : 350000,
		initialAvailableOutgoingBitrate : 200000
	},

	databaseFile : '../data/database',
	roomStatusInterval: 300, // seconds
	publicDirectory : '../data/public/'
};
