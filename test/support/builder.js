define(function() {

	return {

		buildInput: function(type, value, attrs) {
			attrs = attrs || {};
			
			var input = document.createElement('input');
			input.setAttribute('type', type || 'text');
			input.setAttribute('value', value || 'test value');
			
			Object.keys(attrs).reduce(function(acc, key) {
				return acc.setAttribute(key, attrs[key]);
			}, input);

			return input;
		},

		buildForm: function(elements) {
			return elements.reduce(function(form, element) {
				form.appendChild(element);
				return form;
			}, document.createElement('form'));
		}

	};

});