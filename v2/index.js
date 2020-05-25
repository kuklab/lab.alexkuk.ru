
var LG = 4
var MD = 3
var SM = 2
var XS = 1

var WIDTHS = {};
WIDTHS[LG] = 95;
WIDTHS[MD] = 80;
WIDTHS[SM] = 60;
WIDTHS[XS] = 60;


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
	[4, -4, -6, 2, 4, 6],
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
	.style('fill', function(d) {
	    return d > 0 ? 'steelblue' : 'red'
	})
	.style('opacity', 0.9)
	.attr('x', function(d, i) {
	    return i * (bar + shift);
	})
	.attr('width', bar)
	.attr('y', function(d) {
	    if (d > 0) {
		return middle - scale(d);
	    } else {
		return middle;
	    }
	})
	.attr('height', function(d) {
	    return scale(Math.abs(d));
	});

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


function get_layout() {
    // http://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    var element = document.documentElement;
    var body = document.getElementsByTagName('body')[0]
    var width = window.innerWidth || element.clientWidth || body.clientWidth;

    if (width) {
	// http://getbootstrap.com/css/#grid-options
	if (width >= 1200) {
	    return LG;
	} else if (width >= 992) {
	    return MD;
	} else if (width >= 768) {
	    return SM;
	} else {
	    return XS;
	}
    } else {
	return LG;
    }
}


function make_d3_data(a, b, bins) {
    var data = [];
    for (var index = 0; index < bins; index++) {
	data.push(0);
    }
    var samples = 1000;
    var total = 0;
    for (var index = 0; index < samples; index++) {
	var x = index / samples;
	var y = Math.pow(x, a) * Math.pow(1 - x, b);
	var bin = Math.floor(x * bins);
	data[bin] += y;
	total += y;
    }
    for (var index = 0; index < bins; index++) {
	data[index] /= total;
    }
    return data;
}


function viz_d3(frame) {
    var a1 = 2;
    var bs1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    var b1 = bs1[frame % bs1.length];

    var a2 = 3;
    var bs2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    var b2 = bs2[frame % bs2.length];

    var bins = 20;
    var data1 = make_d3_data(a1, b1, bins);
    var data2 = make_d3_data(a2, b2, bins);

    var layout = get_layout();
    var width = WIDTHS[layout];
    if (layout == XS) {
	width *= 6;
    } else {
	width *= 3;
    }
    var height = width / 2.5;

    var margin = {top: 10, right: 10, bottom: 10, left: 10}
    var width = width - margin.left - margin.right;
    var height = height - margin.top - margin.bottom;

    var x = d3.scale.linear()
	.domain([0, 1])
	.range([0, width]);
    
    var max = d3.max([
	d3.max(data1),
	d3.max(data2)
    ]);
    var y = d3.scale.linear()
	.domain([0, max])
	.range([height, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom')
	.tickValues([]);

    var container = d3.select('#d3');
    container.select('svg').remove();
    var svg = container.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + height + ')')
	.call(xAxis)

    var step = 1 / bins;
    var width = x(step) - x(0) - 1;
    svg.selectAll('bar')
	.data(data1)
	.enter().insert('rect', '.axis')
	.attr('class', 'bar blue')
	.attr('x', function(d, index) {
	    return x(index * step) + 1;
	})
	.attr('y', function(d) {
	    return y(d) - 1;
	})
	.attr('width', width)
	.attr('height', function(d) {
	    return height - y(d);
	});

    svg.selectAll('bar')
	.data(data2)
	.enter().insert('rect', '.axis')
	.attr('class', 'bar red')
	.attr('x', function(d, index) {
	    return x(1 - index * step) + 1;
	})
	.attr('y', function(d) {
	    return y(d) - 1;
	})
	.attr('width', width)
	.attr('height', function(d) {
	    return height - y(d);
	});
}


function format_posts() {
    var section = d3.select('.posts');
    var previous = section.select('row');
    var row;
    section.selectAll('li').each(function(d, index) {
	var item = d3.select(this);
	var cell;
	if (index % 3 == 0) {
	    row = section.append('div')
		.attr('class', 'row');
	    cell = row.append('div')
		.attr('class', 'col-sm-offset-1 col-sm-3');
	} else {
	    cell = row.append('div')
		.attr('class', 'col-sm-3');
	}
	cell.node().appendChild(item.node());
    });
    previous.remove();
}


viz_hr();
viz_logo();
viz_captcha = make_viz_frames('#captcha')
viz_facts = make_viz_frames('#facts')
viz_ocr = make_viz_frames('#ocr')
viz_d3(0);
format_posts();


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
	if (STEP % 10 == 0) {
	    var frame = STEP / 10;
	    viz_d3(frame);
	}
    });

