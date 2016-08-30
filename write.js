'use strict';

const fs = require('fs');
const writeLineStream = require('lei-stream').writeLine;

var redis = require('./redis.js');
redis.init();


const s1 = writeLineStream(fs.createWriteStream('./followerlist.txt'), {
  newline: '\n',
  cacheLines: 100
});

redis.lrange('followerlist', 0, -1, function(res){
	s1.write(res);
});

const s = writeLineStream(fs.createWriteStream('./visited.txt'), {
  newline: '\n',
  cacheLines: 100
});

redis.smembers('visited').then(function(res){
	res.forEach(function(r){
		s.write(r);
	});
});


const s2 = writeLineStream(fs.createWriteStream('./tood.txt'), {
  newline: '\n',
  cacheLines: 100
});

redis.smembers('tood').then(function(res){
        res.forEach(function(r){
                s2.write(r);
        });
});




s.on('end', () => {
  console.log('end');
});

s.on('error', (err) => {
  console.error(err);
});
