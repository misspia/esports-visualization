var dataPath = '/app/data/';
var idPrefix = "iso-";

var width = window.innerWidth,
    height = window.innerHeight;

var projection = d3.geo.mercator()
    .center([0, 5])
    .scale((width / 10) * 1)
    .translate([width / 2, height / 2]);
    // .rotate([-180,0]);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g");







function markCities() {

  d3.csv(dataPath + "map/cities.csv", function(error, data) {
      g.selectAll("circle")
         .data(data)
         .enter()
         .append("circle")
         .attr("cx", function(d) {
                 return projection([d.lon, d.lat])[0];
         })
         .attr("cy", function(d) {
                 return projection([d.lon, d.lat])[1];
         })
         .attr("r", 5)
         .style("fill", "red");
  })
}
