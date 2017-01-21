// var center = [-71, 42],
//     velocity = [.012, -.002],
//     t0 = Date.now();
    
// function startAnimation() {

//  d3.timer(function() {
//     var t = Date.now() - t0;
//     projection.rotate([center[0] + velocity[0] * t, center[1] + velocity[1] * t]);
//     // feature.attr("d", path);
//   }); 

// }

var t0 = d3.now();

function rotateProjection() {
	// projection.rotate([-100,0]);
	var t = timer();

	console.log(t0);
	console.log(t)

	var rotation = [0, 0];

	return rotation;
}

function timer() {
	var t; 
	d3.timer(function() {
		t = d3.now() - t0;
		
		// return t;
	})
	console.log(t);
}