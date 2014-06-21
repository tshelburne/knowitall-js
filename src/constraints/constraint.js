define(function() {

	/**
	 * HELPERS
	 */

	var isFunc = function(obj) {
		return obj instanceof Function;
	};

	/**
	 * MODULE
	 */

	var Constraint = function(type, check, error) {
		if (typeof(type) !== 'string') {
			throw new TypeError('Only strings may be used for the constraint type.');
		}

		this.type  = type;
		this.check = check;
		this.error = error || 'There is a problem with your input.';
	};

	Constraint.prototype.fails = function(element) {
		return element.getAttribute('type') === this.type && !this.check(element);
	};

	Constraint.prototype.errorMessage = function(element) {
		return isFunc(this.error) ? this.error(element) : this.error;
	};

	return Constraint;

});