var summary = d3.select('#summary');
	overview = summary.append('div').attr('class','overview');
	summaryTable = summary.append('table'),
	thead = summaryTable.append('thead'),
	tbody = summaryTable.append('tbody');

function populateSummaryTable(d) {
	summary.selectAll('tr').remove();
	var displayTop = 3;
    var arr = objToArr(d),
        byEarnings = filterTop( sortArrByKey(arr, 'earnings'), displayTop ),
        header = ['', 'country', 'Prize Money', 'players' ],
        gameTotals = {
        	players: sumByKey(d, 'players'),
        	earnings: floatToCurrency( sumByKey(d, 'earnings') ),
        	countries: arr.length,
        };
		
    addOverview(gameTotals);
	addTHead(header);
	addTr(byEarnings, displayTop);
}

function sortArrByKey(arr, key) {
    arr.sort(function(a, b) {
        return b[key] - a[key];
     })
    return arr;
}

function filterTop(arr, limit) {
	var newArr =[];

	for(var i = 0; i < limit; i ++) {
		newArr.push(arr[i]);
	}
	return newArr;
}

function addTr(data, limit) {
	for(var i = 0; i < limit; i ++) {

		var countryRow = tbody.append('tr');
		countryRow.append('td').text(i + 1 + '. ');
		addTd(countryRow, data[i]);
	}
}

function addTd(row, d) {
	for(key in d) {
		if(key == 'earnings') {
			var data = floatToCurrency(d[key])
		} else {
			var data = d[key];
		}
		row.append('td').text(data)
	}		
}

function addTHead(data){
	var headerRow = thead.append('tr');
	
	data.forEach(function(d) {
		
		headerRow.append('td')
			.text(d.toUpperCase())
	})
}

function addOverview(total) {
	var text = "Displaying " 
		+ "<strong>" + gameNames[selectedGame] + "</strong> statistics for the top " 
		+ "<strong>" + total.players + " players</strong> among "
		+ "<strong>" + total.countries + " countries</strong> with a prize pool of " 
		+ "<strong>" + total.earnings + "</strong>. ";

	overview.html(text);
}

function sumByKey(obj, key){
	var sum = 0;

	for(var country in obj) {
		sum += obj[country][key];
	};
	return sum;
}



