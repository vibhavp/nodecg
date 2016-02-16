/* global window */
'use strict';

import test from 'ava';
const EventEmitter = require('events').EventEmitter;
const socket = new EventEmitter();
const sinon = require('sinon');

process.env.browser = true;

require('../_mockBrowser')(socket);
const NodeCG = require('../_mockApi')(test, socket);

test('emits readReplicant on the socket', t => {
	const cb = function () {};
	sinon.stub(window.socket, 'emit');
	NodeCG.readReplicant('repName', 'bundleName', cb);
	const stubArgs = window.socket.emit.getCall(0).args;
	t.true(window.socket.emit.calledOnce);
	t.is(stubArgs[0], 'readReplicant');
	t.same(stubArgs[1], {
		name: 'repName',
		bundle: 'bundleName'
	});
	t.is(stubArgs[2], cb);
	window.socket.emit.restore();
});
