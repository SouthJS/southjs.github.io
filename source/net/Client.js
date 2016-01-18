
lychee.define('app.net.Client').requires([
	'lychee.data.BitON',
	'app.net.client.Ping'
]).includes([
	'lychee.net.Client'
]).exports(function(lychee, app, global, attachments) {

	var _BitON = lychee.data.BitON;
	var _Ping  = app.net.client.Ping;



	/*
	 * IMPLEMENTATION
	 */

	var Class = function(data) {

		var settings = lychee.extend({
			codec:     _BitON,
			reconnect: 10000
		}, data);


		lychee.net.Client.call(this, settings);



		/*
		 * INITIALIZATION
		 */

		this.bind('connect', function() {

			this.addService(new _Ping(this));

			if (lychee.debug === true) {
				console.log('(Separated Boilerplate) app.net.Client: Remote connected');
			}

		}, this);

		this.bind('disconnect', function(code) {

			if (lychee.debug === true) {
				console.log('(Separated Boilerplate) app.net.Client: Remote disconnected (' + code + ')');
			}

		}, this);


		this.connect();

	};


	Class.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			var data = lychee.net.Client.prototype.serialize.call(this);
			data['constructor'] = 'app.net.Client';


			return data;

		}

	};


	return Class;

});

