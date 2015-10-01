var fs = require('fs')

// function getCardList(cardDir , cb){
// 	fs.readdir(cardDir , function(err , files){
// 		if (err){
// 			cb(err);
// 			return;
// 		}
// 		var cardList = [];
// 		if (files && files.length){
// 			files.forEach(function (filesname){
// 				console.log(filesname);
// 			})
// 		}
// 		cb(null , cardList)
// 	})
// }

// getCardList('./cardResult' function(err, cardList){
// 	console.log(cardList)
// })



fs.readdir('./cardResult',function(err, files){
	if(!err){
		var sum = 0
		files.forEach(function(files){
			fs.readFile('./cardResult'+ '/' + files, 'utf8', function(err, data){
			sum += JSON.parse(data).length 
			console.log(sum)
			})	
		})
	}
})


