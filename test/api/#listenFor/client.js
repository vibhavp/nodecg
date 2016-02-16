'use strict';

import test from 'ava';
const EventEmitter = require('events').EventEmitter;
const socket = new EventEmitter();

process.env.browser = true;

require('../_mockBrowser')(socket);
require('../_mockApi')(test, socket);

test.cb('message handlers are called when the appropriate message is received', t => {
	t.context.nodecg._messageHandlers.push({
		messageName: 'testMessage',
		bundleName: 'testBundle',
		func: () => {
			t.end();
		}
	});

	socket.emit('message', {
		messageName: 'testMessage',
		bundleName: 'testBundle'
	});
});
