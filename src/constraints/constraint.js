define(function() {

	/**
	 * HELPERS
	 */

	var _isFunc = function(obj) {
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
		this._check = check;
		this._error = error || 'There is a problem with your input.';
	};

	Constraint.prototype.fails = function(element) {
		return element.getAttribute('type') === this.type && !this._check(element);
	};

	Constraint.prototype.errorMessage = function(element) {
		return _isFunc(this._error) ? this._error(element) : this._error;
	};

	return Constraint;

});