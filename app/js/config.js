var dataPath = 'app/json/';
var idPrefix = "iso-";

var gameNames = {
    dota: "Dota 2",
    lol: "League of Legends",
    csgo: "CS:GO",
    sc2: "SC II"
}

function objToArr(obj, inputKey) {
    var arr = [];
    if(typeof inputKey != 'undefined' ) {

        Object.keys(obj).map(function(objectKey, index) {
            var value = obj[objectKey][inputKey];
            arr.push(value);
          });

    } else {
        for(k in obj) {
            arr.push(obj[k]);
        }
    }
    return arr;
}

function groupById(arr) {
  var newArr = [], obj = {}, country;

  for(var i = 0; i < arr.length; i ++) {

    country = arr[i].code;

    if(country in obj) {
      obj[country]["earnings"] += currencyToFloat(arr[i].totalEarnings);
      obj[country]["players"] +=1;

    } else {
      obj[country] = {
        name: arr[i].country,
        earnings: currencyToFloat(arr[i].totalEarnings),
        players: 1
      }
    }
  }
  return obj;
}

function currencyToFloat(num) {
  return num;
  //var newNum = Number(num.replace(/[^0-9\.]+/g,""));
  //return newNum;

}

function floatToCurrency(num) {

  if(typeof num != 'undefined') {
    var currency = "$" + num.toFixed(0).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
   });
    return currency;
  };
}
