define(function(require) {

	var Validator = require('validator');
	var CreditCardConstraint = require('constraints/credit_card_constraint');
	var EventUtil = require('util/events');
	
	// Set up native validator
	var validator = new Validator();
	validator.register(new CreditCardConstraint());

	// Handles validating and re-submitting the form
	var submitForm = function(e) {
		e = e || event;
		e.preventDefault();

		form = e.target || e.srcElement;
		if (validator.validateForm(form)) {
			form.submit();
		}
	};

	// Automatically binds to all forms on the page
	Array.prototype.forEach.call(document.forms, function(form) {
		EventSupport.addEventHandler(form, 'submit', submitForm);
	});

	return validator;

});