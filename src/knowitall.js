define(function(require) {

	var Validator = require('validator');
	var Constraint = require('constraints/constraint');
	var CreditCardConstraint = require('constraints/credit_card_constraint');
	var EventUtil = require('util/events');
	var FormUtil = require('util/forms');

	// Set up native validator
	var _validator = new Validator();
	_validator.register(new CreditCardConstraint());

	var _shouldValidate = function(form, submit) {
		return !FormUtil.noValidate(form, submit);
	};

	// Handles validating when a form submit click event is fired
	var _handleClick = function(e) {
		e = e || event;
		var submit = e.target || e.srcElement;
		var form = submit.form;
		
		if (_shouldValidate(form, submit)) {
			_validator.validateForm(form);
		}
	};

	// Handles validating and re-submitting the form when a form submit event is fired
	var _handleSubmit = function(e) {
		e = e || event;
		var form = e.target || e.srcElement;
		var submit = FormUtil.activeSubmit(form);
		
		if (_shouldValidate(form, submit) && !_validator.validateForm(form)) {
			// prevent the browser from taking action
			e.preventDefault();
			// prevent ancestors from taking action
			e.stopPropagation();
			// prevent sibling listeners from taking action
			e.stopImmediatePropagation();
			submit.click();
		}
	};

	/**
	 * KnowItAll object
	 * An instance of _KnowItAll is the exclusive interface for developers
	 */
	var _KnowItAll = function() {
		this._handledForms = [];
	};

	// Registers a form to be auto-validated on submit
	_KnowItAll.prototype.registerForm = function(form) {
		if (!this.hasForm(form)) {
			EventUtil.addEventHandler(form, 'submit', _handleSubmit);
			FormUtil.submits(form).forEach(function(submit) { 
				EventUtil.addEventHandler(submit, 'click', _handleClick);
			});
			this._handledForms.push(form);
		}
	};

	// Deregisters auto-validation of forms on submit
	_KnowItAll.prototype.deregisterForm = function(form) {
		if (this.hasForm(form)) {
			EventUtil.removeEventHandler(form, 'submit', _handleSubmit);
			FormUtil.submits(form).forEach(function(submit) { 
				EventUtil.removeEventHandler(submit, 'click', _handleClick);
			});
			this._handledForms.splice(this._handledForms.indexOf(form), 1);
		}
	};

	// Checks whether the given form is currently registered
	_KnowItAll.prototype.hasForm = function(form) {
		return this._handledForms.indexOf(form) >= 0;
	};

	// Allows registering a custom constraint with the validator
	_KnowItAll.prototype.registerConstraint = function(type, check, error) {
		_validator.register(new Constraint(type, check, error));
	};

	// Allows deregistering a custom constraint
	_KnowItAll.prototype.deregisterConstraint = function(type) {
		_validator.deregister(type);
	};

	var knowItAll = new _KnowItAll();

	Array.prototype.forEach.call(document.forms, function(form) {
		knowItAll.registerForm(form);
	});

	return knowItAll;

});