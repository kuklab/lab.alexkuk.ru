$(function() {
    var frames = [];
    var labels = [];
    $('#animation .frame').each(function(index) {
	var frame = $(this);
	frames.push(frame);
	var src = frame.attr('src');
	var match = /(\d\d?)_(\d\d?)\.png$/.exec(src)
	var hour = match[1];
	var minute = match[2];
	if (hour.length == 1) {
	    hour = '0' + hour;
	}
	if (minute.length == 1) {
	    minute = '0' + minute;
	}
	var label = '● ' + hour + ':' + minute;
	labels.push(label);
    });

    var handle = $('#handle');

    function update(index) {
	frames.forEach(function(frame) {
	    frame.removeClass('active');
	});
	frames[index].addClass('active');
	handle.text(labels[index]);
    }

    var slider = $('#slider').slider({
	min: 0,
	max: labels.length - 1,
	value: 0,
	create: function() {
	    var index = $(this).slider('value');
            handle.text(labels[index]);
	},
	slide: function(event, ui) {
            update(ui.value);
	    clearInterval(timer);
	},
	change: function(event, ui) {
	    update(ui.value);
	}
    });

    var index = 0;
    var timer = setInterval(function() {
	index = index % frames.length;
	$('#slider').slider('value', index);
	index += 1;
    }, 100);
    
});
