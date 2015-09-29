var http = require('http');
var url = 'http://magiccards.info/al/en/232.html'
var cheerio = require('cheerio')

function filterEdition(editionHtml){
	var $ = cheerio.load(editionHtml)
	var edition = $('table').eq(2).find('small')
	var editionArray = []
	edition.each(function(){
		var edt = $(this).text()
		editionArray.push(edt)
	})
	return editionArray
}

function filterImg(html){
	var $ = cheerio.load(html)
	var img = $('table').eq(3).find('img').eq(0).attr('src')
	console.log(img)
}

http.get(url, function(res){
	var html = ''

	res.on('data', function(data){
		html += data
	})

	res.on('end', function(){
		console.log(filterImg(html))
	})
}).on('error', function(){
	console.log('error')
})

http.get('http://magiccards.info/sitemap.html', function(res){
	var editionHtml = ''

	res.on('data', function(data){
		editionHtml += data
	})

	res.on('end', function(){
		console.log(filterEdition(editionHtml))
	})
}).on('error', function(){
	console.log('error')
})