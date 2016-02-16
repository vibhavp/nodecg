'use strict';

import test from 'ava';
const EventEmitter = require('events').EventEmitter;
const io = new EventEmitter();
require('../_mockApi')(test, io);

test('adds a message handler', t => {
	t.plan(3);

	const handler = function () {};
	t.context.nodecg.listenFor('messageName', 'bundleName', handler);
	t.is(t.context.nodecg._messageHandlers[0].messageName, 'messageName');
	t.is(t.context.nodecg._messageHandlers[0].bundleName, 'bundleName');
	t.is(t.context.nodecg._messageHandlers[0].func, handler);
});

test('defaults to the current bundle namespace', t => {
	const handler = function () {};
	t.context.nodecg.listenFor('messageName', handler);
	t.is(t.context.nodecg._messageHandlers[0].messageName, 'messageName');
	t.is(t.context.nodecg._messageHandlers[0].bundleName, 'test-bundle');
	t.is(t.context.nodecg._messageHandlers[0].func, handler);
});

test('doesn\'t allow multiple handlers for a message', t => {
	const handler = function () {};
	t.context.nodecg.listenFor('messageName', handler);
	t.throws(() => {
		t.context.nodecg.listenFor('messageName', handler);
	}, /attempted to declare a duplicate "listenFor" handler/);
});

test.cb('message handlers are called when the appropriate message is received', t => {
	t.context.nodecg._messageHandlers.push({
		messageName: 'testMessage',
		bundleName: 'testBundle',
		func: () => {
			t.end();
		}
	});

	const socket = new EventEmitter();
	io.emit('connection', socket);
	socket.emit('message', {
		messageName: 'testMessage',
		bundleName: 'testBundle'
	});
});
