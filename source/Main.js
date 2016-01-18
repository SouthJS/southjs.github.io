
lychee.define('app.Main').requires([
	'lychee.data.JSON',
	'app.state.Welcome',
	'app.state.Blog',
	'app.state.Development',
	'app.state.Contact'
]).includes([
	'lychee.app.Main'
]).exports(function(lychee, app, global, attachments) {

	var _JSON   = lychee.data.JSON;
	var _config = attachments["json"].buffer;



	/*
	 * IMPLEMENTATION
	 */

	var Class = function(data) {

		var settings = lychee.extend({}, _config, data);


		lychee.app.Main.call(this, settings);



		/*
		 * INITIALIZATION
		 */

		this.bind('load', function(oncomplete) {

			this.settings.appclient = this.settings.client;
			this.settings.client    = null;

			// this.settings.appserver = this.settings.server;
			// this.settings.server    = null;

			oncomplete(true);

		}, this, true);

		this.bind('init', function() {

			var appclient = this.settings.appclient || null;
			if (appclient !== null) {
				this.client = new app.net.Client(appclient, this);
			}

			// var appserver = this.settings.appserver || null;
			// if (appserver !== null) {
			// 	this.server = new app.net.Server(appserver, this);
			// }


			this.setState('welcome',  new app.state.Welcome(this));
			this.setState('settings', new app.state.Settings(this));

			ui.changeState('welcome');

		}, this, true);

	};


	Class.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			var data = lychee.app.Main.prototype.serialize.call(this);
			data['constructor'] = 'app.Main';

			var settings = data['arguments'][0] || {};
			var blob     = data['blob'] || {};


			if (this.defaults.client !== null) { settings.client = this.defaults.client; }
			if (this.defaults.server !== null) { settings.server = this.defaults.server; }


			data['arguments'][0] = settings;
			data['blob']         = Object.keys(blob).length > 0 ? blob : null;


			return data;

		}

	};


	return Class;

});

