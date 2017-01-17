var summary = d3.select('#summary').append('table'),
	thead = summary.append('thead'),
	tbody = summary.append('tbody');

function populateSummaryTable(d) {
	
	var displayTop = 5;
    var arr = objToArr(d),
        byEarnings = filterTop( sortArrByKey(arr, 'earnings'), displayTop ),
        header = ['', 'country', 'Prize Money', 'players' ];
	
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
		row.append('td').text(d[key])
	}		
}
function addTHead(data){
	console.log(data);
	var headerRow = thead.append('tr');
	
	data.forEach(function(d) {
		
		headerRow.append('td')
			.text(d.toUpperCase())

	})

}

