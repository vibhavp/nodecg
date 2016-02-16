/* global document */
'use strict';

import test from 'ava';
const EventEmitter = require('events').EventEmitter;
const socket = new EventEmitter();

process.env.browser = true;

require('../_mockBrowser')(socket);
require('../_mockApi')(test, socket);

test('sets title if not set', t => {
	document._eventHandlers.DOMContentLoaded[0]();
	t.is(document.title, 'test-bundle');
});

test('redirects to an authError page when an UnauthorizedError is received', t => {
	global.location = {
		href: '',
		protocol: 'http:',
		host: 'fakehost/',
		pathname: 'test'
	};

	socket.emit('error', {
		type: 'UnauthorizedError',
		code: 'test',
		message: 'message'
	});

	t.is(global.location.href, `/authError?code=test&message=message&viewUrl=http://fakehost/test`);
});
