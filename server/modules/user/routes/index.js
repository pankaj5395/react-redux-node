import {Post} from '../../../component/decorators/api';

export default class IndexContoller {

	@Post()
	async index(){
		return 'Hello';
	} 
} 