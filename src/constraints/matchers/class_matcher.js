define(function() {

	var ClassMatcher = function(klass) {
		this.klass = klass;
	};

	ClassMatcher.prototype.matches = function(element) {
		return element.getAttribute('class') && element.getAttribute('class').match(this.klass);
	};

	return ClassMatcher;

});