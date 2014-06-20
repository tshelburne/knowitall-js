define(['constraints/constraint'], function(BaseConstraint) {

	/**
	 * HELPERS
	 */

	var setCustomError = function(element, message) {
		element.setCustomValidity(message);
	};

	var clearCustomError = function(element) {
		setCustomError(element, '');
	};

	var constraintFails = function(element) {
		return function(constraint) { 
			return constraint.fails(element); 
		}
	}

	var validatableElements = function(form) {
		return Array.prototype.filter.call(form.elements, function(element) {
			return [ 'INPUT', 'SELECT', 'TEXTAREA' ].indexOf(element.nodeName) >= 0;
		});
	}

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
	 * runs custom validation over all elements in the form, returns whether the form is entirely valid
	 */
	Validator.prototype.validateForm = function(form) {
		formElements = validatableElements(form);

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
		clearCustomError(element);

		failingConstraints = this._constraints.filter(constraintFails(element));

		if (failingConstraints.length) {
			setCustomError(element, failingConstraints[0].errorMessage(element));
		}

		// we rely on built in methods because it will check for native validations also
		return element.validity.valid;
	};

	return Validator;

});