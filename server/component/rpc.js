const grpc = require('grpc');
import config from '../config';
import fs from 'fs';
const testProto = grpc.load(__dirname + '/../rpc/test/test.proto')
import TestService from '../rpc/test/testService';
import {ucFirst} from '../services/helpers';
export default class RPC{
	
	constructor(){
		this.init();
	}
	async init(){
		this.server = new grpc.Server();
		//await this.loadService(this.server);
		let servicePath = `${__dirname}/../rpc`;
		let dirs = await fs.readdirSync(servicePath);
		for(const dir of dirs){
			let files = await fs.readdirSync(`${servicePath}/`+ dir);
			for(const file of files){
				let filePath = `${servicePath}/${dir}/${file}`
				if(!fs.lstatSync(filePath).isDirectory()){
			  		let fileName = file;
			  		if(file.trim().slice(-6) === '.proto'){
			  			const file = grpc.load(filePath)
			  			let objName = ucFirst(fileName)+'Service';
			  			objName = require(`../rpc/${dir}/${fileName.replace('.proto','')}Service.js`);
			  			for(const [key, value] of Object.entries(file)){
							let serviceBody ={};
							if(typeof value.service !== 'undefined'){
								for(const [serviceKey, body] of Object.entries(value.service)){
									serviceBody[serviceKey]	= objName[key][serviceKey]
								}
								this.server.addService(file[key].service,serviceBody)
							}
						}
			  		}
			  	}
			}
		}
		
		this.server.bind('127.0.0.1:'+config.rpcPort,
		grpc.ServerCredentials.createInsecure())
		console.log('Server running at http://127.0.0.1:' + config.rpcPort )
		await this.server.start()
	}
	async call(serviceName,method,value={}, cb){
		//await this.loadService();
		const TestService = testProto[serviceName];
		//console.log('TestService', TestService)
		const client = new TestService('127.0.0.1:'+ config.rpcPort,
		    grpc.credentials.createInsecure());
		
		return client[method](value,cb);
		
	}

	async loadService(server){
		return server.addService(testProto.TestService.service, {
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