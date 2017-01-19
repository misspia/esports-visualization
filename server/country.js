var fs = require('fs');
var _ = require('underscore')
/*
var codes = JSON.parse(fs.readFileSync('./country-codes.json', 'utf8'));

var dota = JSON.parse(fs.readFileSync('./dota.json', 'utf8'));
//var league = JSON.parse(fs.readFileSync('./league.json', 'utf8'));
//var cs = JSON.parse(fs.readFileSync('./csgo.json', 'utf8'));
//var sc = JSON.parse(fs.readFileSync('./sc2.json', 'utf8'));

var games = [dota]//, league, cs, sc];
var names = ['dota.json', 'league.json', 'csgo.json', 'sc2.json'];
function findCode(country){
  return _.find(codes, function(obj) { return obj.Country.includes(country) })
}
for (var i = 0; i < 1; i++) {
  for (var j = 0; j < games[i].length; j++) {
    games[i][j].code = findCode(games[i][j].country.trim()).Code;
  }
  //console.log(games[i]);
  fs.writeFileSync(names[i], JSON.stringify(games[i]));
}
*/
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
var tourn = JSON.parse(fs.readFileSync('/app/json/tournaments.json', 'utf8'));
var request = require('request');
var cheerio = require('cheerio');
var $;
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    $ = require("jquery")(window);
});
console.log(tourn.length)
function shit(count, teamCount) {
  if (count === tourn.length) {
    fs.writeFileSync('tournaments.json', JSON.stringify(tourn));
    return;
  }
  if (teamCount === tourn[count].winners.length - 1) {
    setTimeout(shit, 75, ++count, 0);
    return;
  }
  //var url = 'http://api.opencagedata.com/geocode/v1/json?q=' + tourn[count].location +'&key=c7633250a2e8a93ba5c1727e7ad6c0f5'
  if (tourn[count].winners[teamCount].names.length == 0) setTimeout(shit, 25, ++count, 0);
  var url = tourn[count].winners[teamCount].names[0].link;
  console.log(url);
  request(url, function(count, url, teamCount) {
    return function(err, resp, body) {
      //$$ = cheerio.load(body);
      //console.log(body);
      var country = $(body).find(".info_box .info_country").clone()	//clone the element
      .children()	//select all the children
		    .remove()	//remove all the children
		      .end()	//again go back to selected element
		        .text();	//get the text of
      console.log("country:", JSON.stringify(country));
      if (country == "") {
        tourn[count].winners[teamCount].geometry = "skip";
        setTimeout(shit, 75, count, ++teamCount);
        return;
      }
      var url = 'http://api.opencagedata.com/geocode/v1/json?q=' + country +'&key=c7633250a2e8a93ba5c1727e7ad6c0f5'
      setTimeout(function(){
        request(url, function(count, url, teamCount) {
                return function(err, resp, body) {
                    console.log(url)
                  var obj;
                  var skip = false;
                  try {
                    obj = JSON.parse(body);
                  }
                  catch(e) {
                    console.log(url)
                    skip = true;
                    tourn[count].winners[teamCount].geometry = "skip";
                    //tourn[count].geometry = "skip";
                  }
                  console.log(obj);
                  if (!skip && obj.results != undefined) {
                    tourn[count].winners[teamCount].geometry = obj.results[0].geometry;
                    //tourn[count].geometry = obj.results[0].geometry;
                    console.log("ASDIASUGDAUSGDIUASGD");
                  }
                  console.log(count);
                  setTimeout(shit, 75, count, ++teamCount);
                };
              }(count, url, teamCount));
      }, 50);

    };
  }(count, url, teamCount));
}
shit(0, 0);
//console.log(games[i]);
