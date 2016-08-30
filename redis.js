var redis = require('redis'),
    RDS_PORT = 6379,        //端口号
    RDS_HOST = '127.0.1.1',    //服务器IP
    RDS_PWD = 'porschev',    //密码    
    RDS_OPTS = {},            //设置项
    client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);


module.exports.exist = function(key, cb){
	client.get(key,function(err, reply){
		if(err)
			throw err;
		else{
			if(!reply){
				//console.log('reply: '+reply);
				//client.set(key,'1',redis.print);
				cb();
				//console.log('111111111111111');
			}else{
				//console.log("redis check: " +reply.toString());
			}
		}
	});
};

module.exports.set = function(key,value){
	client.set(key, value);
};

module.exports.allKeys = function(cb){
	client.keys('*', function (err, keys) {
	  if (err) return console.log(err);
	  
	  keys.forEach(function(k){
		  client.get(k, function(err, reply){
			if (err) return console.log(err);
			cb(k,reply); 
		  });
	  });
	}); 
};

module.exports.del = function(k){
	client.del(k, function(err, res){
		if(err)
			console.log("Error: "+err);
		/*else
			console.log("Res "+res);*/
	});
};

module.exports.sadd = function(set, key){
	return new Promise(function(resolve, reject){
		client.sadd(set, key, function(err, res){
			if(err)
				console.log("SADD Error: "+err);
			/*else
				console.log("SADD "+res);*/
		});
	});
};

module.exports.sismember = function(set, key){
	return new Promise(function(resolve, reject){
		client.sismember(set, key, function(err, res){
			if(err){
				//console.log("SISMEMBER Error: "+err);
				reject(err);
			}else{
				//console.log("SISMEMBER "+res);
				resolve(res==1);
			}
		});	
	});
};

module.exports.spop = function(set){
	return new Promise(function(resolve, reject){
		client.spop(set, function(err, res){
			if(err){
				//console.log("SPOP Error: "+err);
				reject(err);
			}else{
				//console.log("SPOP "+res);
				resolve(res);
			}
		});
	});
};

module.exports.scard = function(set){
	return new Promise(function(resolve, reject){
		client.scard(set, function(err, res){
			if(err){
				//console.log("SPOP Error: "+err);
				reject(err);
			}else{
				//console.log("SPOP "+res);
				resolve(res);
			}
		});
	});
};

module.exports.smembers = function(set){
	return new Promise(function(resolve, reject){
		client.smembers(set, function(err, res){
			if(err){
				reject(err);
			}else{
				resolve(res);
			}
		});
	});
}

module.exports.lpop = function(list){
	return new Promise(function(resolve, reject){
		client.lpop(list, function(err, res){
			if(err){
				//console.log("SPOP Error: "+err);
				reject(err);
			}else{
				//console.log("SPOP "+res);
				resolve(res);
			}
		});
	});
};

module.exports.lrange = function(list, start, end, cb){	
	client.lrange(list, start, end, function (error, items) {
	  if (error) throw error
	  items.forEach(function (item) {
		cb(item);
	  })
	})
};

module.exports.rpush = function(list, key){
	client.rpush(list,key);
};

module.exports.hset = function(hash, key, value){
	client.hset(hash, key, value);
};


module.exports.hget = function(hash, key){
	return new Promise(function(resolve, reject){
		client.hget(hash, key,function(err, res){
			if(err){
				reject(err);
			}else{
				resolve(res);
			}
		});
	});
};

module.exports.init = function(){
	client.auth(RDS_PWD,function(){
		console.log('通过认证');
	});

	client.on('connect',function(){
		//client.set('author', 'Wilson',redis.print);
		//client.get('author', redis.print);
		console.log('connect');
	});

	client.on('ready',function(err){
		console.log('ready');
	});
}