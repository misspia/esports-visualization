var dataPath = 'app/json/';
var idPrefix = "iso-";

var width = window.innerWidth,
    height = window.innerHeight;

// var projection = d3.geoMercator()
var projection = d3.geoOrthographic()
    .center([0, 0])
    // .scale((width / 600) * 80)
    .translate([width / 2, height / 2])
    .rotate([-10,0]);


 var path = d3.geoPath()
        .projection(projection);

var gameNames = {
    dota: "Dota 2",
    lol: "League of Legends",
    csgo: "CS:GO",
    sc2: "SC II"
}


function newSvg() {

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

    return svg;
}

var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');


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









