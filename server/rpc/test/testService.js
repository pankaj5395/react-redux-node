export class TestService{

	static async test(data,cb){
		cb(null, 'my world')
	}

	static async test1(data,cb){
		cb(null, 'hello node')
	}
}