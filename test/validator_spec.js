define(function(require) {

  var Builder = require('test/support/builder.js');

  var Validator = require('validator');
  var CreditCardConstraint = require('constraints/credit_card_constraint');

  var VALID_CC_NUMBER = '4111111111111111';

  beforeEach(function() {
    this.validator = new Validator();
  });

  describe('when registering constraints', function() {

    it('rejects non-instances of Constraint (constraints/constraint)', function() {
      expect(function() { validator.register('constraint'); }).toThrow();
    });

    it('adds the constraint', function() {
      this.validator.register(constraint = new CreditCardConstraint());
      expect(this.validator._constraints).toContain(constraint);
    });

  });

  describe('when validating forms', function() {

    beforeEach(function() {
      this.element1 = Builder.buildInput('number', '2');
      this.element2 = Builder.buildInput('email', 'test@test.com');
      this.form = Builder.buildForm([this.element1, this.element2]);
      
      this.validator.register(new CreditCardConstraint());
    });

    it('returns false if a native element constraint is invalid', function() {
      // we can't use number because apparently the input element forbids accepting non-numeric values
      this.form.appendChild(Builder.buildInput('email', 'bademail'));
      expect(this.validator.validateForm(this.form)).toBeFalsy();
    });

    it('returns false if a registered element constraint is invalid', function() {
      this.form.appendChild(input = Builder.buildInput('creditcard', '1234'));
      expect(this.validator.validateForm(this.form)).toBeFalsy();
    });

    it('returns true if all elements are valid', function() {
      expect(this.validator.validateForm(this.form)).toBeTruthy();
    });

  });

  describe('when validating elements', function() {

    it('returns false if the element fails a native constraint', function() {
      expect(this.validator.validateElement(Builder.buildInput('email', 'bademail'))).toBeFalsy();
    });

    describe('and the element fails a registered constraint', function() {

      beforeEach(function() {
        this.validator.register(new CreditCardConstraint());
        this.input = Builder.buildInput('creditcard', '1234');
      });

      it('returns false', function() {
        expect(this.validator.validateElement(this.input)).toBeFalsy();
      });

      it('marks the element as invalid', function() {
        this.validator.validateElement(this.input);
        expect(this.input.validity.valid).toBeFalsy();
      });

      it('sets a custom error on the element', function() {
        this.validator.validateElement(this.input);
        expect(this.input.validationMessage).toEqual('Please enter a valid credit card number.');
      });

      describe('and the value is corrected', function() {

        beforeEach(function() {
          this.validator.validateElement(this.input);
          this.input.value = VALID_CC_NUMBER;
        });

      it('returns true', function() {
        expect(this.validator.validateElement(this.input)).toBeTruthy();
      });

      it('marks the element as valid', function() {
        this.validator.validateElement(this.input);
        expect(this.input.validity.valid).toBeTruthy();
      });

      it('remove the custom error from the element', function() {
        this.validator.validateElement(this.input);
        expect(this.input.validationMessage).toEqual('');
      });

      });

    });

    it('returns true if all native and registered constraints pass', function() {
      this.validator.register(new CreditCardConstraint());
      expect(this.validator.validateElement(Builder.buildInput('creditcard', VALID_CC_NUMBER))).toBeTruthy();
    });

  });

});