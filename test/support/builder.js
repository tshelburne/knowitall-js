define(function() {

	return {

		buildInput: function(type, value) {
			var input = document.createElement('input');
			input.type = type || 'text';
			input.value = value || 'test value';
			return input;
		},

		buildForm: function(inputs) {
			return inputs.reduce(function(form, input) {
				form.appendChild(input);
				return form;
			}, document.createElement('form'));
		}

	};

});