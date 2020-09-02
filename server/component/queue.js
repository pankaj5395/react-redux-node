import amqp from 'amqplib';
const CONNECTON = 'amqp://localhost'
export default class Queue{
	
	constructor(){
		this.message = null;
		this.init();
	}
	async init(){
		try{
			this.connection = await amqp.connect(CONNECTON);
			this.channel = await this.connection.createChannel('');
			//await this.connection.queue('my-queue');
		}
		catch(e){
			console.log('RPC connection error', e)
		}
	}

	async getChannel(){
		if(this.channel)
			return this.channel;

		return false;
	}

	async publish(queue,_message){
		let channel = await this.getChannel();
		await channel.assertExchange(queue, 'headers',{
		  durable: true,
		  autoDelete: false
		});
		//await this.connection.queue(queue);
		await channel.publish(queue,'', Buffer.from(JSON.stringify(_message)), {contentType:'application/json'});
	}

	async handleQueue(queue,  handle){
		let channel = await this.getChannel();
		await channel.assertExchange(queue, 'headers',{
		  durable: true,
		  autoDelete: false
		});
		let q =  await channel.assertQueue(queue, {
		  durable: true,
		  autoDelete: false
		});
		
		await channel.bindQueue(q.queue, queue, '');
		await channel.consume(q.queue, async msg => {
				if(msg === null){
					console.log('No message')
				}
				await handle(JSON.parse(msg.content.toString()));
				channel.ack(msg);
			});
		//console.log('data',message)
		return this.message;
	}

}