var http = require('http');
var cheerio = require('cheerio')
var fs = require('fs')
// var result = require('./result.json')

function filterMap(mapHtml){
	var $ = cheerio.load(mapHtml)
	var map = $('table').find('li').find('a')
	var mapHref = []
	map.each(function(){
		var maps = $(this).attr('href')
		var edition = 'magiccards.info' + maps
		mapHref.push(edition)
	})
	return mapHref
}
// console.log(result[0].toString())

http.get('http://magiccards.info/sitemap.html',function(res){
	var html = null
	res.on('data',function(data){
		html += data
	})
	res.on('end',function(){
		console.log(filterMap(mapHtml))
		fs.writeFileSync('result.json', JSON.stringify(filterMap(mapHtml)))
	})
}).on('error',function(){
	console.log('err')
})
