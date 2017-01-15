queue()
    .defer(d3.json, dataPath + "map/world-110m2.json")
    .defer(d3.json,dataPath + "esports/dota.json" )
    // .defer(d3.json,dataPath + "esports/league.json" )
    .await(function(error, topology, players) {
      if(error) throw error;
      
      countryEarnings = sumByCountry(players);

      quantile = setQuantile(countryEarnings);
     
      drawMap(topology, countryEarnings);

      
    })


function drawMap(topology, countryEarnings) {
 
      g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries)
            .geometries)
        .enter()
          .append("path")
          .attr("d", path)
          .attr("id", function(d){ return idPrefix + d.id; })
          .attr("class", function(d) {  return colorClass(countryEarnings[d.id]) })
       
}

function sumByCountry(arr) {
  var newArr = [], obj = {}, country;

  for(var i = 0; i < arr.length; i ++) {

    country = arr[i].code;

    if(country in obj) {

      obj[country] += currencyToInt(arr[i].totalEarnings)

    } else {

      obj[country] = currencyToInt(arr[i].totalEarnings)
    }
  }
  return obj;

}

function currencyToInt(num) {

  num = parseInt(num.replace(/\D/g, ''))
  return num

}





