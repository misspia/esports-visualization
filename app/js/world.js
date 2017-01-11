var mapDataPath = '/app/data/map/';


var width = window.innerWidth,
    height = window.innerHeight;

var projection = d3.geo.mercator()
    .center([0, 5])
    .scale((width / 640) * 100)
    .translate([width / 2, height / 2]);
    // .rotate([-180,0]);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g");

drawMap(width, height);


function defineMap() {

  
}


function drawMap(width, height) {


// load and display the World
d3.json(mapDataPath + "world-110m2.json", function(error, topology) {
    g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)

      markCities();
});

}


function markCities() {

  d3.csv(mapDataPath + "cities.csv", function(error, data) {
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






