define(function(require) {

	describe('built in constraints', function() {

		var Builder = require('test/support/builder.js');

		describe('the base constraint', function() {

			var Constraint = require('constraints/constraint');

			it('throws without a string type', function() {
				expect(function() { new Constraint(true); }).toThrow();
			});

			it('does not fail when the type does not match', function() {
				var constraint = new Constraint('nomatch');
				expect(constraint.fails(Builder.buildInput())).toBeFalsy();
			});

			it('throws when the type matches and no check has been given', function() {
				var constraint = new Constraint('match');
				expect(function() { constraint.fails(Builder.buildInput('match')); }).toThrow();
			});

			it('fails when the type matches and the check fails', function() {
				var constraint = new Constraint('match', function(element) { 
					return false; 
				});
				expect(constraint.fails(Builder.buildInput('match'))).toBeTruthy();
			});

			it('does not fail when the type matches and the check passes', function() {
				var constraint = new Constraint('match', function(element) {
					return true;
				});
				expect(constraint.fails(Builder.buildInput('match'))).toBeFalsy();
			});

			it('returns a default failure message', function() {
				var constraint = new Constraint('match');
				expect(constraint.errorMessage(Builder.buildInput('match'))).toEqual('There is a problem with your input.');
			});

			it('returns a specified string for the failure message', function() {
				var constraint = new Constraint('match', null, 'A failure occurred.');
				expect(constraint.errorMessage(Builder.buildInput('match'))).toEqual('A failure occurred.');
			});

			it('returns the result of a specified function for the error message', function() {
				var constraint = new Constraint('match', null, function(element) {
					return 'An element of type \'' + element.getAttribute('type') + '\' doesn\'t work.';
				});
				expect(constraint.errorMessage(Builder.buildInput('match'))).toEqual('An element of type \'match\' doesn\'t work.');
			});

		});

		describe('the credit card constraint', function() {

			var Constraint = require('constraints/credit_card_constraint');
			var constraint = new Constraint();

			var ccInput = function(value) {
				return Builder.buildInput('creditcard', value);
			};

			it('responds to type \'creditcard\'', function() {
				spyOn(constraint, '_check').andReturn(false);

				expect(constraint.fails(ccInput())).toBeTruthy();
				expect(constraint.fails(Builder.buildInput('text'))).toBeFalsy();
			});

			it('recognizes a valid credit card number', function() {
				expect(constraint.fails(ccInput('4111111111111111'))).toBeFalsy();
			});

			it('fails with a null value', function() {
				expect(constraint.fails(ccInput(null))).toBeTruthy();
			});

			it('fails with the empty string', function() {
				expect(constraint.fails(ccInput(''))).toBeTruthy();
			});

			it('fails with too few digits', function() {
				expect(constraint.fails(ccInput('4111111111'))).toBeTruthy();
			});

			it('fails with non-numeric values', function() {
				expect(constraint.fails(ccInput('411111111111asdf'))).toBeTruthy();
			});

			it('fails with spaces', function() {
				expect(constraint.fails(ccInput('4111 1111 1111 1111'))).toBeTruthy();
			});

			it('fails with dashes', function() {
				expect(constraint.fails(ccInput('4111-1111-1111-1111'))).toBeTruthy();
			});

		});

	});

});