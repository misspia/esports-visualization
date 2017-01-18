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
      });
}

function createMap(topology, countryEarnings) {
    d3.select("#map svg").remove();
    
    svg = newSvg();

    g = svg.append("g");

      g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries)
            .geometries)
        .enter()
          .append("path")
          .attr("d", path)
          .attr("id", function(d){ return idPrefix + d.id; })
          .attr("class", function(d) { return colorClass(countryEarnings[d.id], "earnings") })
          .on('mousemove', function(d) { tooltipEnter(d); })
          .on('mouseout', function() { tooltip.classed('hidden', true); });  
}



function groupById(arr) {
  var newArr = [], obj = {}, country;

  for(var i = 0; i < arr.length; i ++) {
    
    country = arr[i].code;

    if(country in obj) {
      obj[country]["earnings"] += currencyToInt(arr[i].totalEarnings);
      obj[country]["players"] +=1;

    } else {
      obj[country] = {
        name: arr[i].country,
        earnings: currencyToInt(arr[i].totalEarnings),
        players: 1     
      }
    }
  }
  return obj;
}

function currencyToInt(num) {
  
  num = Number(num.replace(/[^0-9\.]+/g,""));
  return num;

}

function intToCurrency(num) {

  if(typeof num != 'undefined') {
    return "$" + num.toFixed(0).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
   });
  }
    
}

function tooltipEnter(d) {
  
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

  earnings = intToCurrency(country.earnings);

    var contents = '<span class="title">' + country.name + '</span></br>' +
                    '<span class="description"> Total Prize Money: ' + earnings + '</span></br>' +
                    '<span class="description"> Published Players: ' + country.players + '</span>';

    return contents;
}





