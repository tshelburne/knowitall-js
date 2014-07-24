define(function(require) {

	describe('the attribute matcher', function() {

		var AttrMatcher = require('constraints/matchers/attr_matcher');
		var Builder = require('test/support/builder.js');

		beforeEach(function() {
			this.element = Builder.buildInput(null, null, { name: 'test-name' });
		});

		it('matches element attribute values', function() {
			var matcher = new AttrMatcher('name', 'test-name');
			expect(matcher.matches(this.element)).toBeTruthy();
		});

		it('rejects element attribute values', function() {
			var matcher = new AttrMatcher('name', 'bad-name');
			expect(matcher.matches(this.element)).toBeFalsy();
		});

	});

});