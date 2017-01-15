var fs = require('fs');
var _ = require('underscore')
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
