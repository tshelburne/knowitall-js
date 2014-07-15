define(function(require) {

	var Builder = require('test/support/builder.js');
	var FormUtil = require('util/forms');

	describe('form utility functions', function() {

		beforeEach(function() {
			// build form components
			this.input1 = Builder.buildInput();
			this.input2 = Builder.buildInput();
			this.submit = Builder.buildInput('submit', 'Submit');
			this.imageSubmit = Builder.buildInput('image');
			this.select1 = document.createElement('select');
			this.select2 = document.createElement('select');
			this.textarea = document.createElement('textarea');
			this.inFormSubmitButton = document.createElement('button');
			this.inFormResetButton = document.createElement('button');
			this.inFormResetButton.setAttribute('type', 'reset');
			this.outFormSubmitButton = document.createElement('button');
			this.outFormSubmitButton.setAttribute('form', 'test-form');
			this.outFormResetButton = document.createElement('button');
			this.outFormResetButton.setAttribute('form', 'test-form');
			this.outFormResetButton.setAttribute('type', 'reset');
			this.outNonFormSubmitButton = document.createElement('button');

			// build form
			this.form = Builder.buildForm([this.input1, this.input2, this.select1, this.select2, this.textarea, this.submit, this.imageSubmit, this.inFormSubmitButton, this.inFormResetButton]);
			this.form.setAttribute('id', 'test-form');

			// add form / components to document
			document.body.appendChild(this.form);
			document.body.appendChild(this.outFormSubmitButton);
			document.body.appendChild(this.outFormResetButton);
			document.body.appendChild(this.outNonFormSubmitButton);
		});

		afterEach(function() {
			document.body.removeChild(this.form);
			document.body.removeChild(this.outFormSubmitButton);
			document.body.removeChild(this.outFormResetButton);
			document.body.removeChild(this.outNonFormSubmitButton);
		});

		describe('getting elements of a form', function() {

			it('returns input elements', function() {
				expect(FormUtil.elements(this.form)).toContain(this.input1);
				expect(FormUtil.elements(this.form)).toContain(this.input2);
				expect(FormUtil.elements(this.form)).toContain(this.submit);
			});

			it('returns select elements', function() {
				expect(FormUtil.elements(this.form)).toContain(this.select1);
				expect(FormUtil.elements(this.form)).toContain(this.select2);
			});

			it('returns textarea elements', function() {
				expect(FormUtil.elements(this.form)).toContain(this.textarea);
			});

			it('does not return image submits', function() {
				expect(FormUtil.elements(this.form)).not.toContain(this.imageSubmit);
			});

			it('does not return internal button elements', function() {
				expect(FormUtil.elements(this.form)).not.toContain(this.inFormSubmitButton);
			});

		});

		describe('getting submit elements for a form', function() {

			it('returns submit inputs', function() {
				expect(FormUtil.submits(this.form)).toContain(this.submit);
			});

			it('returns image submit inputs', function() {
				expect(FormUtil.submits(this.form)).toContain(this.imageSubmit);
			});

			it('returns internal submit buttons', function() {
				expect(FormUtil.submits(this.form)).toContain(this.inFormSubmitButton);
			});

			it('returns external submit buttons (attached by form=formid)', function() {
				expect(FormUtil.submits(this.form)).toContain(this.outFormSubmitButton);
			});

			it('does not return internal non-submit buttons', function() {
				expect(FormUtil.submits(this.form)).not.toContain(this.inFormResetButton);
			});

			it('does not return external non-submit buttons', function() {
				expect(FormUtil.submits(this.form)).not.toContain(this.outFormResetButton);
			});

			it('does not return external non-form buttons', function() {
				expect(FormUtil.submits(this.form)).not.toContain(this.outNonFormSubmitButton);
			});

		});

		describe('checking the form validation', function() {

			describe('when the form novalidate is not specified', function() {

				it('should be validated if the submit formnovalidate is not specified', function() {
					expect(FormUtil.noValidate(this.form, this.submit)).toEqual(false);
				});

				it('should not be validated if the submit formnovalidate is specified', function() {
					this.submit.setAttribute('formnovalidate', '');
					expect(FormUtil.noValidate(this.form, this.submit)).toEqual(true);
				});

			});

			describe('when the form novalidate is false', function() {

				beforeEach(function() {
					this.form.setAttribute('novalidate', '');
				});

				it('should be validated if the submit formnovalidate is not specified', function() {
					expect(FormUtil.noValidate(this.form, this.submit)).toEqual(true);
				});

				it('should not be validated if the submit formnovalidate is specified', function() {
					this.submit.setAttribute('formnovalidate', '');
					expect(FormUtil.noValidate(this.form, this.submit)).toEqual(true);
				});

			});

			describe('when the form novalidate is true', function() {

				beforeEach(function() {
					this.form.setAttribute('novalidate', '');
				});

				it('should not be validated if the submit formnovalidate is not specified', function() {
					expect(FormUtil.noValidate(this.form, this.submit)).toEqual(true);
				});

				it('should not be validated if the submit formnovalidate is specified', function() {
					this.submit.setAttribute('formnovalidate', '');
					expect(FormUtil.noValidate(this.form, this.submit)).toEqual(true);
				});

			});

		});

		describe('when determining the most active submit element', function() {

			it('returns the active element if it is a submit for the form', function() {
				this.inFormSubmitButton.focus();
				expect(FormUtil.activeSubmit(this.form)).toEqual(this.inFormSubmitButton);
				this.inFormResetButton.focus();
				expect(FormUtil.activeSubmit(this.form)).not.toEqual(this.inFormResetButton);
			});

			it('returns the first submit element if the active element is not a form submit', function() {
				this.input1.focus();
				expect(FormUtil.activeSubmit(this.form)).toEqual(this.submit);
			});

			it('returns the first submit element if there is no active element', function() {
				expect(FormUtil.activeSubmit(this.form)).toEqual(this.submit);
			});

		});

	});

});