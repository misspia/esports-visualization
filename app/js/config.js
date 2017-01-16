var dataPath = '/app/data/';
var idPrefix = "iso-";

var width = window.innerWidth,
    height = window.innerHeight;

var projection = d3.geo.mercator()
    .center([0, 5])
    .scale((width / 600) * 85)
    .translate([width / 2, height / 2])
    .rotate([-10,0]);

function newSvg() {
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

    return svg;

}


 var path = d3.geo.path()
        .projection(projection);


// var svg = d3.select("#map").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// var g = svg.append("g");

var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');


 var legend = d3.select(".legend");

 legend.attr('id', 'legend')

