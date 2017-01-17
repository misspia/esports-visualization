var legend = d3.select("#legend");

function populateLegend(d) {
    
    legend.selectAll('.key').remove();

    for(var i = 0; i <= d.length; i ++) {
        // var legendKey = legend.append('div')
        var legendKey = legend.append('rect')
            .attr('class', 'key q' + i )
            .append('span')
                .text( abbreviateNumber(d[i]) )
    }
}

function abbreviateNumber(num) {
    
    var newNum;
    var suffix = {
        b: 1000000000,
        m: 1000000,
        k: 1000
    }
    for(s in suffix) {

        if(num >= suffix[s]) {

            newNum = "$" + (num / suffix[s]).toFixed(1) + s;
            break;
        }
    }
    return newNum;
}
