define(function() {

	var FormUtil = function() {};

	/**
	 * @param HTMLFormElement
	 * @return Array
	 */
	FormUtil.prototype.elements = function(form) {
		return Array.prototype.filter.call(form.elements, function(element) {
			return ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(element.nodeName) >= 0;
		});
	};

	/**
	 * @param HTMLFormElement
	 * @return Array
	 */
	FormUtil.prototype.submits = function(form) {
		var inputs = Array.prototype.filter.call(form.getElementsByTagName('input'), function(element) {
			return element.type === 'submit' || element.type === 'image';
		});

		var buttons = Array.prototype.filter.call(document.getElementsByTagName('button'), function(button) {
			return button.type === 'submit' && (form.contains(button) || (button.form !== null && button.form === form));
		});

		return inputs.concat(buttons);
	};

	/**
	 * @param HTMLFormElement
	 * @param HTMLButtonElement | HTMLInputElement
	 * @return boolean
	 */
	FormUtil.prototype.noValidate = function(form, submit) {
		// this logic appears more complicated than necessary, but it will support
		// formnovalidate="false" if browsers ever decide to do that
		if (submit.getAttribute('formnovalidate') !== null) { return submit.formNoValidate; }
		if (form.getAttribute('novalidate') !== null) { return form.noValidate; }
		return false;
	};

	/**
	 * @param HTMLFormElement
	 * @return HTMLButtonElement | HTMLInputElement
	 */
	FormUtil.prototype.activeSubmit = function(form) {
		allSubmits = this.submits(form);

		return allSubmits.indexOf(document.activeElement) >= 0 ? document.activeElement : allSubmits[0];
	}

	return new FormUtil();

});