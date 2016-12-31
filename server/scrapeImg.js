var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');

const EventEmitter = require('events');
require('events').EventEmitter.defaultMaxListeners = Infinity;

fs.readFile('../src/assets/json/buildingList.json', 'utf8', function (err, data) {
    if (err) throw err; 

    var obj = JSON.parse(data);

	    for(i = 0; i < obj.length; i++){

	    	downloadImg(obj[i], 1);
	    	
	    	sleepFor(2000);

	    };	    	
    });

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function downloadImg(item, attempts) {
	console.log("current: " + item['Building Name']);

	var nameKey = "Building Name";

	links = item['Links'];
	buildingName = item[nameKey];
	targetLink = links[links.length - 1];

	var baseImgUrl = "http://www.skyscrapercenter.com/";
	var imgLink = $(container).children('img').attr('src');
	var url = baseImgUrl + imgLink;

	console.log(url);

	request(url)
		.on('error', function(err) {
		    console.log("couldn't download " + attempts + " times: " + item.name);
		    downloadImg(item, attempts++);

		    if (attempts > 3) {
		    	console.log("failed more than 3 times, not retrying");
		    }
		})
		.pipe(fs.createWriteStream('../../app/img/'+ item.sprite.toLowerCase() + ".gif"));
}




function downloadImages(dataList) {
	

	for(var i = 0; i < dataList.length; i ++ ){

		links = dataList[i]['Links'];
		buildingName = dataList[i][nameKey];
		targetLink = links[links.length - 1];

		request(targetLink, function(error, response, html){
			var img$ = cheerio.load(html);
			var mainImgContainer = img$('a.building-image').eq(0);

			writeImage('../src/assets/img/building_outlines/' + buildingName, img$, '#building-image-container');
			writeImage('../src/assets/img/buildings/' + buildingName, img$, mainImgContainer);

		});

		if(i % 5 == 0) {
			sleepFor(2000);
		} else {
			sleepFor(1000);
		}

	}
}

function writeImage(filePath, $, container) {

	var baseImgUrl = "http://www.skyscrapercenter.com/";
	var imgLink = $(container).children('img').attr('src');
	var url = baseImgUrl + imgLink;
	console.log(url);
	
	request(url)
	.on('error', function(error) {

		console.log('ERROR FAILED TO DOWNLOAD: ' + error);
	
	})
	.pipe(fs.createWriteStream(filePath + '.png' ));
};