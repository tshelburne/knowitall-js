define(function(require) {

	describe('the type matcher', function() {

		var TypeMatcher = require('constraints/matchers/type_matcher');
		var Builder = require('test/support/builder.js');

		beforeEach(function() {
			this.typeElement = Builder.buildInput('testtype');
			this.classElement = Builder.buildInput(null, null, { class: 'knowitall-testtype' });
		});

		it('matches element type values', function() {
			var matcher = new TypeMatcher('testtype');
			expect(matcher.matches(this.typeElement)).toBeTruthy();
		});

		it('rejects element type values', function() {
			var matcher = new TypeMatcher('badtype');
			expect(matcher.matches(this.typeElement)).toBeFalsy();
		});

		it('matches default knowitall class values', function() {
			var matcher = new TypeMatcher('testtype');
			expect(matcher.matches(this.classElement)).toBeTruthy();
		});

		it('rejects default knowitall class values', function() {
			var matcher = new TypeMatcher('badtype');
			expect(matcher.matches(this.classElement)).toBeFalsy();
		});

	});

});