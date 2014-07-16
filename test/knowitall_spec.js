define(function(require) {

	describe('knowitall base file', function() {

		var EventUtil = require('util/events');
		var Builder = require('test/support/builder.js');
		var knowItAll = require('knowitall');


		beforeEach(function() {
			this.ccInput = Builder.buildInput('creditcard', 'badvalue');
			this.submit  = Builder.buildInput('submit');

			this.form = Builder.buildForm([ this.ccInput, this.submit ]);

			this.swallowSubmit = function(e) {
				e.preventDefault();
			};

			spyOn(this, 'swallowSubmit').andCallThrough();

			document.body.appendChild(this.form);
			knowItAll.registerForm(this.form);

			// this must be registered afterwards, since order of registration is significant
			EventUtil.addEventHandler(this.form, 'submit', this.swallowSubmit);
		});

		afterEach(function() {
			knowItAll.deregisterForm(this.form);
			document.body.removeChild(this.form);
		});

		describe('included validation constraints', function() {

			it('will validate credit card inputs', function() {
				this.submit.click();
				expect(this.ccInput.validity.valid).toBeFalsy();
				expect(this.swallowSubmit).not.toHaveBeenCalled();

				this.ccInput.value = '4111111111111111';
				this.submit.click();
				expect(this.ccInput.validity.valid).toBeTruthy();
				expect(this.swallowSubmit).toHaveBeenCalled();
			});

		});

		describe('registering custom constraints', function() {

			beforeEach(function() {
				this.ccInput.value = '4111111111111111';
				this.switchInput = Builder.buildInput('switch');
				this.form.appendChild(this.switchInput);
			});

			afterEach(function() {
				knowItAll.deregisterConstraint('switch');
			});

			it('will fail validation with a custom registered constraint', function() {
				knowItAll.registerConstraint('switch', function(element) { return false; }, 'The switch is invalid.');
				this.submit.click();
				expect(this.switchInput.validity.valid).toBeFalsy();
				expect(this.switchInput.validationMessage).toEqual('The switch is invalid.');
				expect(this.swallowSubmit).not.toHaveBeenCalled();
			});

			it('will pass validation with a custom registered constraint', function() {
				knowItAll.registerConstraint('switch', function(element) { return true; }, 'The switch is invalid.');
				this.submit.click();
				expect(this.switchInput.validity.valid).toBeTruthy();
				expect(this.switchInput.validationMessage).toEqual('');
				expect(this.swallowSubmit).toHaveBeenCalled();
			});

		});

		describe('registering forms', function() {
			
			it('will not validate unregistered forms', function() {
				knowItAll.deregisterForm(this.form);
				this.submit.click();
				expect(this.swallowSubmit).toHaveBeenCalled();
			});

		});

		describe('when a registered form is submitted by the submit click event', function() {

			it('will not validate the form if novalidate is set', function() {
				this.form.setAttribute('novalidate', '');
				this.submit.click();
				expect(this.swallowSubmit).toHaveBeenCalled();
			});

			it('will not validate the form if formnovalidate is set on the submit button', function() {
				this.submit.setAttribute('formnovalidate', '');
				this.submit.click();
				expect(this.swallowSubmit).toHaveBeenCalled();
			});

			describe('and the form should be validated', function() {

				it('will submit the form if validation is successful', function() {
					this.ccInput.value = '4111111111111111';
					this.submit.click();
					expect(this.swallowSubmit).toHaveBeenCalled();
				});

				it('will not submit the form if validation is unsuccessful', function() {
					this.submit.click();
					expect(this.swallowSubmit).not.toHaveBeenCalled();
				});

			});

		});

		describe('when a registered form is submitted by the form submit event', function() {

			var submitForm = function(form) {
				event = document.createEvent('HTMLEvents');
				event.initEvent('submit', true, true);
				form.dispatchEvent(event);
			};

			it('will not validate the form if novalidate is set', function() {
				this.form.setAttribute('novalidate', '');
				submitForm(this.form);
				expect(this.swallowSubmit).toHaveBeenCalled();
			});

			it('will not validate the form if formnovalidate is set on the submit button', function() {
				this.submit.setAttribute('formnovalidate', '');
				submitForm(this.form);
				expect(this.swallowSubmit).toHaveBeenCalled();
			});

			describe('and the form should be validated', function() {

				it('will submit the form if validation is successful', function() {
					this.ccInput.value = '4111111111111111';
					submitForm(this.form);
					expect(this.swallowSubmit).toHaveBeenCalled();
				});

				it('will not submit the form if validation is unsuccessful', function() {
					submitForm(this.form);
					expect(this.swallowSubmit).not.toHaveBeenCalled();
				});

			});

		});

	});

});