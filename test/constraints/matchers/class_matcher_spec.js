define(function(require) {

	describe('the class matcher', function() {

		var ClassMatcher = require('constraints/matchers/class_matcher');
		var Builder = require('test/support/builder.js');

		beforeEach(function() {
			this.element = Builder.buildInput(null, null, { class: 'test-class' });
		});

		it('matches element class values', function() {
			var matcher = new ClassMatcher('test-class');
			expect(matcher.matches(this.element)).toBeTruthy();
		});

		it('rejects element class values', function() {
			var matcher = new ClassMatcher('bad-class');
			expect(matcher.matches(this.element)).toBeFalsy();
		});

	});

});