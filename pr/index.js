
function viz_hr() {
    d3.selectAll('.hr').each(function() {
	var size = 100;
    	var left = Math.random() * 20 + 20;
    	var center = left + Math.random() * 10 + 10;
    	var x = center + Math.random() * 10 + 10;
    	var right = size - x;

	var container = d3.select(this)
	    .append('svg')
    	    .attr('width', size)
    	    .attr('height', 3);

	container
    	    .append('rect')
    	    .attr('x', 1)
    	    .attr('y', 1)
    	    .attr('width', left)
    	    .attr('height', 1)
    	    .attr('fill', 'silver');

	container
    	    .append('circle')
    	    .attr('cx', center)
    	    .attr('cy', 1)
    	    .attr('r', 1)
    	    .attr('fill', 'silver');

	container
    	    .append('rect')
    	    .attr('x', x)
    	    .attr('y', 1)
    	    .attr('width', right)
    	    .attr('height', 1)
    	    .attr('fill', 'silver');

    });


}


function viz_logo() {
    var series = [
	[-5, 3, 5, 1, 9, -2],
	[9, -3, 1, -3, 2, 5],
	[7, 6, 10, -10, -8, -7]
    ];
    var data = series[Math.floor(Math.random() * 3)]

    var height = 60;
    var middle = height / 2;
    var bar = 10;
    var shift = 2;
    var width = (bar + shift) * 6 - shift;

    var container = d3.select('#logo');
    var svg = container.append('svg')
	.attr('width', width)
	.attr('height', height);

    var scale = d3.scale.linear()
	.range([0, height / 2])
	.domain([0, 10]);

    svg.selectAll('bar')
	.data(data)
	.enter().append('rect')
	.style('fill', function(d) { return d > 0 ? '#337ab7' : 'red' })
	.style('opacity', 0.9)
	.attr('x', function(d, i) { return i * (bar + shift); })
	.attr('width', bar)
	.attr('y', function(d) {
	    if (d > 0) {
		return middle - scale(d);
	    } else {
		return middle;
	    }
	})
	.attr('height', function(d) { return scale(Math.abs(d)); });

}

function make_viz_frames(selector) {
    var frames = d3.select(selector).selectAll('.frame');
    var size = frames.size();

    return function(frame) {
	var index = frame % size;
	frames.each(function(d, i) {
	    var frame = d3.select(this);
	    if (index == i) {
		frame.attr('class', 'frame visible');
	    } else {
		frame.attr('class', 'frame hidden');
	    }
	});
    };
}


viz_hr();
viz_logo();
viz_captcha = make_viz_frames('#captcha')
viz_facts = make_viz_frames('#facts')
viz_ocr = make_viz_frames('#ocr')
viz_d3 = make_viz_frames('#d3')


var STEP = 100000000;
var OFFSET = 0;
d3.select(window)
    .on('scroll.scroller', function() {
	var offset = window.pageYOffset;
	if (offset > OFFSET) {
	    STEP += 1;
	} else {
	    STEP -= 1;
	}
	OFFSET = offset;
	if (STEP % 15 == 0) {
	    var frame = STEP / 15;
	    viz_captcha(frame);
	    viz_facts(frame);
	    viz_ocr(frame);
	}
	if (STEP % 5 == 0) {
	    var frame = STEP / 5;
	    viz_d3(frame);
	}
    });

