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

			var _expectInvalidSwitch = function() {
				this.submit.click();
				expect(this.switchInput.validity.valid).toBeFalsy();
				expect(this.switchInput.validationMessage).toEqual('The switch is invalid.');
				expect(this.swallowSubmit).not.toHaveBeenCalled();
			};

			var _expectValidSwitch = function() {
				this.submit.click();
				expect(this.switchInput.validity.valid).toBeTruthy();
				expect(this.switchInput.validationMessage).toEqual('');
				expect(this.swallowSubmit).toHaveBeenCalled();
			};

			beforeEach(function() {
				this.ccInput.value = '4111111111111111';
				this.switchInput = Builder.buildInput();
				this.form.appendChild(this.switchInput);
			});

			describe('by type', function() {

				beforeEach(function() {
					this.switchInput.setAttribute('type', 'switch');
				});

				afterEach(function() {
					knowItAll.deregister(this.customConstraint);
				});

				it('will fail validation', function() {
					this.customConstraint = knowItAll.registerType('switch', function(element) { return false; }, 'The switch is invalid.');
					_expectInvalidSwitch.call(this);
				});

				it('will pass validation', function() {
					this.customConstraint = knowItAll.registerType('switch', function(element) { return true; }, 'The switch is invalid.');
					_expectValidSwitch.call(this);
				});

				it('will use type validation by default with the register method', function() {
					this.customConstraint = knowItAll.register('switch', function(element) { return false; }, 'The switch is invalid.');
					_expectInvalidSwitch.call(this);
				});

				it('will also check a default class', function() {
					this.switchInput.setAttribute('type', 'text');
					this.switchInput.setAttribute('class', 'knowitall-switch');
					this.customConstraint = knowItAll.registerType('switch', function(element) { return false; }, 'The switch is invalid.');
					_expectInvalidSwitch.call(this);
				});

			});

			describe('by class', function() {

				beforeEach(function() {
					this.switchInput.setAttribute('class', 'switch-class');
				});

				afterEach(function() {
					knowItAll.deregister(this.customConstraint);
				});

				it('will fail validation', function() {
					this.customConstraint = knowItAll.registerClass('switch-class', function(element) { return false; }, 'The switch is invalid.');
					_expectInvalidSwitch.call(this);
				});

				it('will pass validation', function() {
					this.customConstraint = knowItAll.registerClass('switch-class', function(element) { return true; }, 'The switch is invalid.');
					_expectValidSwitch.call(this);
				});

			});

			describe('by name', function() {

				beforeEach(function() {
					this.switchInput.setAttribute('name', 'switch-name');
				});

				afterEach(function() {
					knowItAll.deregister(this.customConstraint);
				});

				it('will fail validation', function() {
					this.customConstraint = knowItAll.registerName('switch-name', function(element) { return false; }, 'The switch is invalid.');
					_expectInvalidSwitch.call(this);
				});

				it('will pass validation', function() {
					this.customConstraint = knowItAll.registerName('switch-name', function(element) { return true; }, 'The switch is invalid.');
					_expectValidSwitch.call(this);
				});

			});

			it('will deregister constraints', function() {
				this.switchInput.setAttribute('type', 'switch');
				customConstraint = knowItAll.register('switch', function() { return false; }, 'The switch is invalid.');
				knowItAll.deregister(this.switchInput);
				_expectValidSwitch.call(this);
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