var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var numeral = require('numeral');
var argv = require('minimist')(process.argv.slice(2));
var _ = require('underscore')
var url = 'http://www.esportsearnings.com/games/151-starcraft-ii/top-players'
var data = {'dota-2': []};
function aCreativeName(x, count) {
  var link = (x == 0) ? url: url + '-x' + x*100;
  request(link, function(x, count) {
    return function(err, resp, body) {
      $ = cheerio.load(body);
      $(".detail_box_smooth:contains('Top Player Rankings')").find(".format_row").each(function(){
        var username = $(this).find("a[href*='players']")[0];
        redirect = "http://www.esportsearnings.com" + $(username).attr('href');
        data['dota-2'].push({username: $(username).text(), link: redirect, count: ++count});
        console.log(count);
        if (count == 500) shit(0);
        else if ((count % 100) == 0) aCreativeName(++x, count);
      }) //foreach
    };  //return
  }(x, count)); //initial request
}
//aCreativeName(0, 0);
function currency(x){
  return numeral(x).value();
}
function shit(count) {
  if (count == 500) {
    fs.writeFileSync('sc2.json', JSON.stringify(data['dota-2']));
    return;
  }
  request(data['dota-2'][count].link, function(count) {
    return function(err, resp, body) {
      $ = cheerio.load(body);
      console.log($('.info_box .format_row:contains("Name:") .info_text_value').text());
      //console.log(username);
      var obj = {
        link: data['dota-2'][count].link,
        username: data['dota-2'][count].username,
        name: $('.info_box .format_row:contains("Name:") .info_text_value').text(),
        age:  $('.info_box .format_row:contains("Age:") .info_text_value').text(),
        totalEarnings:  currency($('.info_box .format_row:contains("Total Prize Money Earned:") .info_text_value span').text()),
        numTournaments:  currency($('.info_box .format_row:contains("Total Prize Money Earned:") .info_text_value').text().split('From')[1]),
        country:         $('.info_box .info_country').text(),
        worldRanking:     currency($('.info_box .format_row:contains("World Ranking:") .info_text_value').text())
      }
      data['dota-2'][count] = obj;
      console.log(obj)
      console.log(count);
      setTimeout(shit, 50, count + 1);
    };  //return
  }(count));  //request
}
var codes = JSON.parse(fs.readFileSync('./country-codes.json', 'utf8'));

var dota = JSON.parse(fs.readFileSync('./dota.json', 'utf8'));
var league = JSON.parse(fs.readFileSync('./lol.json', 'utf8'));
var cs = JSON.parse(fs.readFileSync('./csgo.json', 'utf8'));
var sc = JSON.parse(fs.readFileSync('./sc2.json', 'utf8'));

var games = [dota, league, cs, sc];
var names = ['dota.json', 'league.json', 'csgo.json', 'sc2.json'];
function findCode(country){
  return _.find(codes, function(obj) { return obj.Country.includes(country) })
}
for (var i = 0; i < 4; i++) {
  for (var j = 0; j < games[i].length; j++) {
    games[i][j].code = findCode(games[i][j].country.trim()).Code;
  }
  //console.log(games[i]);
  fs.writeFileSync(names[i], JSON.stringify(games[i]));
}
