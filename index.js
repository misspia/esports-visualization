var request = require('request');
var cheerio = require('cheerio');
var scraperjs = require('scraperjs');
var urls = ['http://www.esportsearnings.com/games/151-starcraft-ii/top-players']
var data = {'dota-2': {}};
var count = 0;
var fin = false;


for (var i = 0; i < 1; i++){
  for (var j = 4; j < 5; j++) {
    var url = (j == 0) ? urls[i]: urls[i] + '-x' + j*100;
    request(url, function(err, resp, body) {
      $ = cheerio.load(body);
      $(".detail_box_smooth:contains('Top Player Rankings')").find(".format_row").each(function(){
        var username = $(this).find("a[href*='players']")[0];
        data['dota-2'][$(username).text()] = {};
        redirect = "http://www.esportsearnings.com" + $(username).attr('href');
        scraperjs.StaticScraper.create(redirect)
        .scrape(function($) {
          return $(".info_box").map(function() {
            return {
              name: $(this).find('.format_row:contains("Name:") .info_text_value').text(),
              age:  $(this).find('.format_row:contains("Age:") .info_text_value').text(),
              totalEarnings:  $(this).find('.format_row:contains("Total Prize Money Earned:") .info_text_value span').text(),
              numTournaments:  $(this).find('.format_row:contains("Total Prize Money Earned:") .info_text_value').text(),
              country:         $(this).find('.info_box .info_country').text(),
              worldRanking:     $(this).find('.info_box .format_row:contains("World Ranking:") .info_text_value').text()
            };
          }).get();
        })
        .then(function(news) {
          if (news.length != 0) {
            news[0].numTournaments = news[0].numTournaments.split('From')[1].replace(/\D/g, '');
            //data['dota-2'][username] = news[0];
            console.log(news[0]);
          }
        })
      }) //foreach
    }); //request
  }
}

//console.log(data['dota-2'][username]);
