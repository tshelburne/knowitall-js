define(function() {

	var AttrMatcher = function(attr, value) {
		this.attr = attr;
		this.value = value;
	};

	AttrMatcher.prototype.matches = function(element) {
		return element.getAttribute(this.attr) === this.value;
	};

	return AttrMatcher;

});