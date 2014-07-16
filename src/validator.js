define(['constraints/constraint', 'util/forms'], function(BaseConstraint, FormUtil) {

	/**
	 * HELPERS
	 */

	var _setCustomError = function(element, message) {
		element.setCustomValidity(message);
	};

	var _clearCustomError = function(element) {
		_setCustomError(element, '');
	};

	var _constraintFails = function(element) {
		return function(constraint) { 
			return constraint.fails(element); 
		};
	};

	/**
	 * MODULE
	 */

	var Validator = function() {
		this._constraints = [];
	};

	/**
	 * registers a new constraint with the validator
	 */
	Validator.prototype.register = function(constraint) {
		if (!constraint instanceof BaseConstraint) {
			throw new TypeError('Registered constraints must be an instance or child of Constraint.');
		}
		this._constraints.push(constraint);
	};

	/**
	 * registers a new constraint with the validator
	 */
	Validator.prototype.deregister = function(type) {
		this._constraints = this._constraints.filter(function(constraint) {
			return constraint.type !== type;
		});
	};

	/** 
	 * runs custom validation over all elements in the form, returns whether the form is entirely valid
	 */
	Validator.prototype.validateForm = function(form) {
		formElements = FormUtil.elements(form);

		var l = formElements.length;
		for (var i = 0; i < l; i++) {
			this.validateElement(formElements[i]);
		}

		// we rely on built in methods because it will check for native validations also
		return form.checkValidity();
	};

	/**
	 * runs custom validation over the given element, returns whether the element is valid
	 */
	Validator.prototype.validateElement = function(element) {
		_clearCustomError(element);

		failingConstraints = this._constraints.filter(_constraintFails(element));

		if (failingConstraints.length) {
			_setCustomError(element, failingConstraints[0].errorMessage(element));
		}

		// we rely on built in methods because it will check for native validations also
		return element.validity.valid;
	};

	return Validator;

});