'use strict';

const fs = require('fs');
const writeLineStream = require('lei-stream').writeLine;

var redis = require('./redis.js');
var MongoClient = require('mongodb').MongoClient;


redis.init();
//redis.exist('hello');
//redis.allKeys(function(k,v){console.log(k+':'+v);});


  
var url = 'mongodb://localhost:27017/yunpan';

/*
MongoClient.connect(url, function(err, db) {
  if(err){
	 db.close();
	 throw err;  
  }
  console.log("Connected correctly to server");
  var collection = db.collection('data');

  redis.allKeys(function(k,v){
	  remove(k,v);
	   // collection.insertMany([{title:k, content:v}], function(err, result) {
	  //	  if(err) throw err;
	  //});
  });
});*/

function remove(k,v){
	if( /^\d+$/.test(k)){
		console.log(k+" || "+v);
		redis.del(k);
	}
}

/*
redis.sadd('todo', 123);
redis.sadd('todo', 124);
redis.sadd('todo', 125);

redis.sismember('todo', 123).then(function(res){console.log(res);});
redis.sismember('todo', 127).then(function(res){console.log(res);});

redis.spop('todo').then(function(res){console.log(res);});
redis.scard('todo').then(function(res){console.log(res);});

redis.rpush('followerlist', 123);
redis.lpop('followerlist').then(function(res){console.log(res)});

redis.hset('lastvisited', 'uk', 132);
redis.hset('lastvisited', 'start', 1);
redis.hget('lastvisited', 'uk').then(function(res){console.log(res)});
redis.hget('lastvisited', 'start').then(function(res){console.log(res)});
*/

/*redis.lrange('followerlist', 0, -1, function(res){console.log(res)});
redis.lrange('followerlist', 0, -1, function(res){
	redis.sadd('tood', res);
});*/



/*

const s = writeLineStream(fs.createWriteStream('./followerlist.txt'), {
  newline: '\n',
  cacheLines: 100
});

redis.lrange('followerlist', 0, -1, function(res){
	s.write(res);
});*/

const s = writeLineStream(fs.createWriteStream('./visited.txt'), {
  newline: '\n',
  cacheLines: 100
});

redis.smembers('visited').then(function(res){
	res.forEach(function(r){
		s.write(r);
	});
});

s.on('end', () => {
  console.log('end');
});

s.on('error', (err) => {
  console.error(err);
});


