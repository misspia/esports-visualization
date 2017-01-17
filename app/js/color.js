function colorClass(d, key) { 
		if(typeof d != 'undefined') {

		var className = quantile(d[key]);

		return className;
	}
}

function maxValue(data) {
	var arr = objToArr(data),
		maxValue = d3.max(arr);

	return maxValue;
}

function setQuantile(data) {

	var arr = objToArr(data, "earnings");

	var quantile = d3.scaleQuantile()
	.domain(arr)
    .range(d3.range(9).map(function(i) { return "q" + i}) )

    return quantile;
}


