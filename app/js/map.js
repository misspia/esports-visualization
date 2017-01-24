var width = window.innerWidth,
    height = window.innerHeight;

var origin = [0, -15],
    velocity = [.016, -.002],
    t0 = Date.now();

var projection = d3.geoOrthographic()
    .center([0, 0])
    .scale(height / 2.5)
    .translate([width / 2, height / 2])

var path = d3.geoPath()
        .projection(projection);

var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');

renderViz(selectedGame);

function renderViz(game) {
  queue()
      .defer(d3.json, dataPath + "map/world-110m2.json")
      .defer(d3.json,dataPath + "esports/" + game + ".json" )
      .await(function(error, topology, players) {
        if(error) throw error;

        countryEarnings = groupById(players);
        quantile = setQuantile(countryEarnings);
       
        createMap(topology, countryEarnings);
        populateLegend(quantile.quantiles());  
        populateSummaryTable(countryEarnings);    
    });
}

function createMap(topology, countryEarnings) {
    // d3.select("#map svg").remove();

    var svg = newSvg();

    var country = svg.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries)
            .geometries)
        .enter()
          .append("path")
          .attr("d", path)
          .attr("id", function(d){ return idPrefix + d.id; })
          .attr("class", function(d) { return colorClass(countryEarnings[d.id], "earnings") })
          .on('mousemove', function(d) { tooltipEnter(svg, d); })
          .on('mouseout', function() { tooltip.classed('hidden', true); })

    rotateProjection(country);
}

function newSvg() {

    var svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom()
        .on("zoom", function () { zoom(svg); }))
        .on("mousedown.zoom", null)
      .append("g");

    return svg;
}


function zoom(svg) {
  
  var zoomedSvg =  svg.attr("transform",
         "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" 
         + " scale(" + d3.event.transform.k + ")");

  return zoomedSvg;
}

function tooltipEnter(svg, d) {
  
    var country = countryEarnings[d.id];

    if(typeof country != 'undefined') {
      var displayInfo = tooltipContents(country);

      var mouse = d3.mouse(svg.node()).map(function(d) { return parseInt(d); });

        tooltip.classed('hidden', false)
            .attr('style', 'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
            .html( displayInfo );
    }
}

function tooltipContents(country) {

  earnings = floatToCurrency(country.earnings);

    var contents = '<span class="title">' + country.name + '</span></br>' +
                    '<span class="description"> Total Prize Money: ' + earnings + '</span></br>' +
                    '<span class="description"> Published Players: ' + country.players + '</span>';

    return contents;
}

function rotateProjection(country){
    d3.timer(function() {
        var t = Date.now() - t0;
        projection.rotate([origin[0] + velocity[0] * t, origin[1] + velocity[1] * t]);
        projection.rotate([origin[0] + velocity[0] * t, origin[1] ]);
        country.attr("d", path);
    })
}





