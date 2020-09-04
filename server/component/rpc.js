const grpc = require('grpc');
import config from '../config';

const testProto = grpc.load(__dirname + '/../rpc/test/test.proto')

export default class RPC{
	
	constructor(){
		this.init();
	}
	async init(){
		this.server = new grpc.Server();
		await this.loadService(this.server);
		/*this.server.addService(testProto.TestService.service,{
			test: async (data, cb) => {
				cb(null,'Hello RPC');
			}
		})*/
		this.server.bind('127.0.0.1:'+config.rpcPort,
		grpc.ServerCredentials.createInsecure())
		console.log('Server running at http://127.0.0.1:' + config.rpcPort )
		await this.server.start()
	}
	async call(serviceName,method,value={}, cb){
		//await this.loadService();
		const TestService = testProto[serviceName];
		console.log('TestService', TestService)
		const client = new TestService('127.0.0.1:'+ config.rpcPort,
		    grpc.credentials.createInsecure());
		
		return client[method](value,cb);
		
	}

	async loadService(server){
		server.addService(testProto.TestService.service, {
			test: async (data,cb) => {
				cb('Hello RPC');
			}
		})
	}

	
}
/*const TestService = testProto.TestService;

module.exports = {
  RPC : RPC,
  client : new TestService('127.0.0.1:'+ config.rpcPort,
		    grpc.credentials.createInsecure())
}*/