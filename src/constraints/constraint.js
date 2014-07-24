define(['constraints/matchers/type_matcher'], function(TypeMatcher) {

	/**
	 * HELPERS
	 */

	var _isFunc = function(obj) {
		return obj instanceof Function;
	};

	/**
	 * MODULE
	 */

	var Constraint = function(matchers, check, error) {
		if (typeof(matchers) === 'string') {
			matchers = [new TypeMatcher(matchers)];
		}
		
		this._matchers = matchers;
		this._check = check;
		this._error = error || 'There is a problem with your input.';
	};

	Constraint.prototype.matches = function(element) {
		return this._matchers.reduce(function(acc, matcher) {
			return acc || matcher.matches(element);
		}, false);	
	};

	Constraint.prototype.fails = function(element) {
		return this.matches(element) && !this._check(element);
	};

	Constraint.prototype.errorMessage = function(element) {
		return _isFunc(this._error) ? this._error(element) : this._error;
	};

	return Constraint;

});