var request = require('request');
var cheerio = require('cheerio');
var scraperjs = require('scraperjs');
var argv = require('minimist')(process.argv.slice(2));
var urls = ['http://www.esportsearnings.com/tournaments/largest-overall-prize-pools']
var data = {'dota-2': {}};
var count = 0;
var fin = false;
var ranks = ['gold', 'silver', 'bronze']

for (var j = argv._[0]; j < argv._[0]+1; j++) {
  var url = (j == 0) ? urls[0]: urls[0] + '-x' + j*100;
  request(url, function(err, resp, body) {
    $ = cheerio.load(body);
    $(".detail_box_smooth:contains('Largest Overall Prize Pools in eSports')").find(".format_row").each(function(){
      var username = $(this).find("a[href*='tournaments']")[0];
      redirect = "http://www.esportsearnings.com" + $(username).attr('href');
      scraperjs.StaticScraper.create(redirect)
      .scrape(function($) {
        return $("body").map(function() {
          var winners = [];
          for (var i = 0; i < 3; i++) {
            if (winners.length === 3) return;
            var lol = '.tournament_medalist_box .player_earning_'+ranks[winners.length];
            var team = $(lol).find('.tournament_medalist_name .tournament_team_medalist_name').text() == "" ? "SOLO": $(lol).find('.tournament_medalist_name .tournament_team_medalist_name').text();
            var names = [];
            $(lol).find('.tournament_medalist_name .player_team_medalist_link').each(
              function(){
                if (names.length == 5) return;
                names.push({
                  link: 'http://www.esportsearnings.com' + $(this).attr('href'),
                  username: $(this).text()
                })
              });
              winners.push({
                rank: $(lol).find('.tournament_medalist_rank').text(),
                team: team,
                earnings: $(lol).find('.tournament_medalist_prize').text(),
                names: names
              })
            }
            return {
              title:  $(this).find('.info_box .info_box_title').text(),
              location: $(this).find('.info_box .format_row:contains("Location:") .info_text_value').text(),
              date: $(this).find('.info_box .format_row:contains("Date:") .info_text_value').text(),
              game: $(this).find('.info_box .format_row:contains("Game:") .info_text_value a').text(),
              prizePool: $(this).find('.info_box .format_row:contains("Prize Pool:") .info_text_value').text(),
              currency: $(this).find('.info_box .format_row:contains("Currency:") .info_text_value').text(),
              winners: winners
            };
          }).get();
        })
        .then(function(news) {
          if (news.length != 0) {
            var tourney = news[0];
            if (tourney.game.toLowerCase().includes('dota') || tourney.game.toLowerCase().includes('league') || tourney.game.toLowerCase().includes('counter') || tourney.game.toLowerCase().includes('starcraft')) {
              for (var i = 0; i < tourney.winners.length; i++) {
                tourney.winners[i].rank = tourney.winners[i].rank.replace(/\D/g, '').slice(0,1);
                tourney.winners[i].earnings = tourney.winners[i].earnings.replace(/\D/g, '');
              }
              tourney.prizePool = tourney.prizePool.replace(/\D/g, '');
              //news[0].numTournaments = news[0].numTournaments.split('From')[1].replace(/\D/g, '');
              //data['dota-2'][username] = news[0];
              console.log(JSON.stringify(news[0]));
            }
          }
        })
      }) //foreach
    }); //request
  }

  //console.log(data['dota-2'][username]);
