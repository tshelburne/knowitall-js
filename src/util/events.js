define(function() {

	return {

		addEventHandler: function(node, type, func) {
			if (node.addEventListener) {
				node.addEventListener(type, func, false);
			}
			else if (node.attachEvent) {
				node.attachEvent('on' + type, func);
			}
			else {
				node['on' + type] = func;
			}
		},

		removeEventHandler: function(node, type, func) {
			if (node.removeEventListener) {
				node.removeEventListener(type, func, false);
			}
			else if (node.detachEvent) {
				node.detachEvent('on' + type, func);
			}
			else {
				node['on' + type] = null;
			}
		}

	};

});