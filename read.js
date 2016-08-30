'use strict';

const fs = require('fs');
const readLine = require('lei-stream').readLine;
var redis = require('./redis.js');
redis.init();


const s = readLine(fs.createReadStream('./followerlist.txt'), {
  newline: '\n',
  autoNext: false,
  toString : true
});


s.on('data', (data) => {
  redis.rpush('followerlist', data);
  s.next();
});


s.on('end', () => {
  console.log('end');
});


s.on('error', (err) => {
  console.error(err);
});

const s1 = readLine(fs.createReadStream('./visited.txt'), {
  newline: '\n',
  autoNext: false,
  toString : true
});


s1.on('data', (data) => {
  redis.sadd('visited', data);
  s1.next();
});


s1.on('end', () => {
  console.log('end');
});


s1.on('error', (err) => {
  console.error(err);
});
