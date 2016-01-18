lychee.define('app.state.Welcome').includes([
	'lychee.app.State'
]).tags({
	platform: 'html'
}).exports(function(lychee, app, global, attachments) {

	var Class = function(main) {

		lychee.app.State.call(this, main);

	};


	Class.prototype = {

	};


	return Class;

});

