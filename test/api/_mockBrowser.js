'use strict';

module.exports = (test, emitter) => {
	if (!emitter) {
		const EventEmitter = require('events').EventEmitter;
		emitter = new EventEmitter();
	}

	global.document = {
		addEventListener(event, cb) {
			if (!this._eventHandlers[event]) {
				this._eventHandlers[event] = [];
			}

			this._eventHandlers[event].push(cb);
		},
		_eventHandlers: {},
		title: ''
	};

	global.window = global.window || {};
	global.window.socket = emitter;
};
