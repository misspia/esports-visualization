var dataPath = '/app/data/';
var idPrefix = "iso-";

var width = window.innerWidth,
    height = window.innerHeight;

var projection = d3.geo.mercator()
    .center([0, 0])
    .scale((width / 600) * 70)
    .translate([width / 2, height / 2])
    .rotate([-10,0]);


 var path = d3.geo.path()
        .projection(projection);


function newSvg() {

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

    return svg;
}

var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');


var legend = d3.select("#legend");

function populateLegend(d) {
    
    legend.selectAll('.key').remove();

    console.log(d.length)
    for(var i = 0; i <= d.length; i ++) {
        var legendKey = legend.append('div')
            .attr('class', 'key q' + i )
            .append('span')
                .text( intToCurrency(d[i]) )
    }
}



