let cheerio = require('cheerio');
let request = require('request');
var fs = require('fs');
// var baseFilePath = '/app/json/';

var baseUrl = "http://www.esportsearnings.com";
var playerPages = [
	"/top-players", "/top-players-x100", "/top-players-x200", "/top-players-x300", "/top-players-x400"
]

scrape();


function scrape() {
	var url = {};
	getLinks(baseUrl, function(url) {
		requestEachGame(url);
	})
}

function getLinks(baseUrl, callback) {
	request(baseUrl + '/games' , function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			var $ = cheerio.load(body);
			var gameContainer = $('.content_main').children('.detail_box_game');
			var url = {};

			$(gameContainer).each(function(i, ele) {
				var a = $(this).find('a'),
					href = $(a).attr('href');
					gameTitle = $(a).text();

				url[gameTitle] = href;
			})
			callback(url);
		  }
	})
}

function requestEachGame(urlList) {
	
	for(var game in urlList) {
		
		var url = baseUrl + urlList[game];
		requestPlayerTables(url);			
	}
}

function requestPlayerTables(url) {

	for(var i = 0; i < playerPages.length; i ++) {
		// var newUrl = url + playerPages[i];
		// console.log(newUrl);
		request(url + playerPages[i], function(error, response, body) {
			if(error) throw error;
			var $ = cheerio.load(body); 
			getPlayerLinks($);	
		})	
	}
}

function getPlayerLinks($) {
	var playerTable = $('table.detail_list_table').find('tbody');
	var playerRow = $(playerTable).children('tr');
	console.log($(playerTable).text())
	$(playerRow).each(function(i, ele) {
		console.log(i);
		// var playerLink = $(this).children('.detail_list_player').children('a').attr('href');
		var playerLink = $(this).text();
		// children('.detail_list_order').children('a').attr('href');
		console.log(playerLink);
	})
}
	


















