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
		}

	};

});