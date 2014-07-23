define(['constraints/matchers/attr_matcher', 'constraints/matchers/class_matcher'], function(AttrMatcher, ClassMatcher) {

	var TypeMatcher = function(type) {
		this.attrMatcher = new AttrMatcher('type', type);
		this.classMatcher = new ClassMatcher('knowitall-' + type);
	};

	TypeMatcher.prototype.matches = function(element) {
		return this.attrMatcher.matches(element) || this.classMatcher.matches(element);
	};

	return TypeMatcher;

});