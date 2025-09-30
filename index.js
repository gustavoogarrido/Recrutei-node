const Recrutei = require('./dist/nodes/Recrutei/Recrutei.node.js');
const RecruteiApi = require('./dist/credentials/RecruteiApi.credentials.js');

module.exports = {
	nodes: [
		Recrutei,
	],
	credentials: [
		RecruteiApi,
	],
};