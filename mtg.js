var http = require('http');
var cheerio = require('cheerio')
var fs = require('fs')
var result = require('./result.json')
var test = require('./test.json')

function filterCard(html){
	var $ = cheerio.load(html)
	var card = $('table').eq(3).find('a')
	var cardArray = []
	card.each(function(){
		var cards = $(this).attr('href')
		var cardInfo = 'http://magiccards.info' + cards
		cardArray.push(cardInfo)
	})
	return cardArray
}


playCardLoop(0)
function playCardLoop(index){
	if(result.length > index){
		setTimeout(function(){
			
			http.get(result[index],function(res){
				var html = null
				var resultPath = result[index-1].split('info/')[1].split('.html')[0].replace('/',' & ')
				res.on('data',function(data){
					html += data
				})
				res.on('end',function(){
					console.log(filterCard(html))
					fs.writeFileSync('./cardResult/' + resultPath + '.json', JSON.stringify(filterCard(html)))
				})
			}).on('error',function(){
				console.log('err')
			})

			playCardLoop(++index);
			console.log(index);
		},10000)
	}		
}




