var http = require('http');
var cheerio = require('cheerio')
var fs = require('fs')
var result = require('./result.json')

http.get(result[0],function(res){
	var html = null
	res.on('data',function(data){
		html += data
	})
	res.on('end',function(){
		console.log(html)
	})
}).on('error',function(){
	console.log('err')
})
