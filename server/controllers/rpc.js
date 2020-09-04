import User from '../models/user';
import { setUserInfo, getRole } from '../services/helpers';
//import {client} from '../component/rpc';
//= =======================================
// User Routes
//= =======================================
exports.testRpc = async (req, res, next) => {
	//console.log(RPC)
	//const {err,}
	/*let result = RPC.test({},(err,data)=>{
			console.log(data);
			return data;
		});*/
	let result = await RPC.call('TestService','test',{},(err, result)=>{
		console.log(err,result);
		return res.status(200).json({ data: result });	
	});
	//console.log(result)
    //let result = await RPC.test({});
    
};
