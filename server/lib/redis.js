var redis = require('redis');

client    = redis.createClient({
    port      : 6379,               // replace with your port
    host      : '120.0.0.1',        // replace with your hostanme or IP address
  });


client.on('connect', function() {
    console.log('connected');
});

/**
 * @name : SetKey
 * @description : to set the key in Redis server
 * @author : Pankaj Sharma
 */
var SetKey = exports.SetKey = function (key, data, time = 3600) {
      return new Promise((resolve, reject) => {
            console.log("OK Done")
            RedisClient.set(key, data)
            if (time) {
                  RedisClient.expire(key, time);
            }
            resolve(true);
      });
}

/**
 * @name : GetKey
 * @description : to get the value of Key from Redis server
 * @author : Pankaj Sharma
 */
var GetKey = exports.GetKey = function (key) {
      return new Promise((resolve, reject) => {
            RedisClient.get(key, (err, data) => {
                  if (err) {
                        console.log('Redis error 1 : ', err)
                        reject(err);
                  } else {
                        console.log('Redis 1: ', data)
                        resolve(data);
                  }
            });
      });
}