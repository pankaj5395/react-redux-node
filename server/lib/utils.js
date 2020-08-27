export default class Utils { 
	static functionName(string){
		string = string.split('_');
		const strNew=[];
		for(let st of string){
			strNew.push(st.charAt(0).toUpperCase() + st.slice(1));	
		}
		return strNew.join('');
	}
}