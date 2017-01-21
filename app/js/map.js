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
    d3.select("#map svg").remove();
    
    // var projection = createProjection(rotateProjection());
    // var projection = createProjection();
    // var path = createPath(projection);

    var svg = newSvg();

    var g = svg.append("g");

    var feature = g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries)
            .geometries)
        .enter()
          .append("path")
          .attr("d", path)
          .attr("id", function(d){ return idPrefix + d.id; })
          .attr("class", function(d) { return colorClass(countryEarnings[d.id], "earnings") })
          .on('mousemove', function(d) { tooltipEnter(svg, d); })
          .on('mouseout', function() { tooltip.classed('hidden', true); });

    d3.timer(function() {
        var t = Date.now() - t0;
        // projection.rotate([origin[0] + velocity[0] * t, origin[1] + velocity[1] * t]);
        projection.rotate([origin[0] + velocity[0] * t, origin[1]]);
        feature.attr("d", path);
    })
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

  num = Number(num.replace(/[^0-9\.]+/g,""));
  return num;

}

function floatToCurrency(num) {

  if(typeof num != 'undefined') {
    return "$" + num.toFixed(0).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
   });
  }
    
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





