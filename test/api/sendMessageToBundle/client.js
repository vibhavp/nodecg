/* global window */
'use strict';

import test from 'ava';
const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;
const socket = new EventEmitter();

process.env.browser = true;

require('../_mockBrowser')(socket);
const NodeCG = require('../_mockApi')(test, socket);

test('calls window.socket.emit', t => {
	sinon.stub(window.socket, 'emit');
	NodeCG.sendMessageToBundle('messageName', 'bundleName', 'data');
	const stubArgs = window.socket.emit.getCall(0).args;
	t.true(window.socket.emit.calledOnce);
	t.is(stubArgs[0], 'message');
	t.same(stubArgs[1], {
		messageName: 'messageName',
		bundleName: 'bundleName',
		content: 'data'
	});
	window.socket.emit.restore();
});

test('accepts a callback & has an optional "data" argument', t => {
	sinon.stub(window.socket, 'emit');
	const cb = function () {};
	NodeCG.sendMessageToBundle('messageName', 'bundleName', cb);
	const stubArgs = window.socket.emit.getCall(0).args;
	t.true(window.socket.emit.calledOnce);
	t.is(stubArgs[0], 'message');
	t.same(stubArgs[1], {
		messageName: 'messageName',
		bundleName: 'bundleName',
		content: null
	});
	t.is(stubArgs[2], cb);
	window.socket.emit.restore();
});
