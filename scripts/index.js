
var COMPANY = $('#contacts #company');
var ABOUT = $('#contacts #about');
var CONTACT = $('#contacts #contact');
var NAME = $('#contacts #name');
var INPUTS = [
    COMPANY,
    ABOUT,
    CONTACT,
    NAME
];
var FORM = $('#contacts form');
var BUTTON = $('#contacts button');
var SUBMITTING = $('#contacts #submitting');
var SUBMIT = $('#contacts #submit');
var SUCCESS = $('#contacts #success');
var ERROR = $('#contacts #error');

var print = console.log;


function columnCases() {
    var container = $('#cases .row');
    var column = $('#cases .col');
    var items = $('#cases .case');

    column.empty();

    var columns = [column];
    for (var index = 0; index < 2; index++) {
	var clone = column.clone();
	columns.push(clone);
	container.append(clone);
    }

    for (var index = 0; index < items.length; index++) {
	var column = columns[index % columns.length];
	column.append(items[index]);
    }
}


/////////////
//
//  FORM
//
/////////


function saveInput() {
    var item = $(this);
    var key = item.attr('id');
    var value = item.val();
    localStorage.setItem(key, value);
}


function loadInput(item) {
    var key = item.attr('id');
    var value = localStorage.getItem(key);
    if (value) {
	item.val(value);
    }
}


function clearForm() {
    INPUTS.forEach(function(item) {
	var key = item.attr('id');
	item.val(null);
	localStorage.setItem(key, null);
    });
}


function formData() {
    var data = {};
    INPUTS.forEach(function(item) {
	var key = item.attr('id');
	var value = item.val();
	data[key] = value;
    });
    return data;
}


function freezeForm() {
    SUBMIT.hide();
    SUBMITTING.show();
    INPUTS.forEach(function(item) {
	item.prop('disabled', true);
    });
    BUTTON.prop('disabled', true);
}


function unfreezeForm() {
    SUBMIT.show();
    SUBMITTING.hide();
    INPUTS.forEach(function(item) {
	item.prop('disabled', false);
    });
    BUTTON.prop('disabled', false);
}


function formSuccess() {
    SUCCESS.show();
    ERROR.hide();
}


function formError() {
    SUCCESS.hide();
    ERROR.show();
}


function clearStatus() {
    SUCCESS.hide();
    ERROR.hide();
    FORM.removeClass('was-validated');
}


function validatedForm() {
    FORM.addClass('was-validated');
}


function validForm() {
    for (var index = 0; index < INPUTS.length; index++) {
	var value = INPUTS[index].val()
	if (!value) {
	    return false;
	}
    }
    return true;
}


function submitForm() {
    clearStatus();

    if (!validForm()) {
	validatedForm();
	return;
    }

    freezeForm();

    var data = formData();
    var request = $.ajax({
	url: 'https://formspree.io/xyynkadl',
	method: 'POST',
	data: data,
	dataType: 'json'
    });
    
    request.done(function() {
	clearForm();
	formSuccess();
	unfreezeForm()
    });

    request.fail(function() {
	formError();
	unfreezeForm();
    });
}


/////////////
//
//  MAIN
//
/////////


columnCases();

INPUTS.forEach(function(item) {
    item.change(saveInput);
    loadInput(item);
});
BUTTON.click(submitForm);
