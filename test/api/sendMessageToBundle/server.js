'use strict';

import test from 'ava';
const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;
const io = new EventEmitter();
require('../_mockApi')(test, io);

test('calls io.emit', t => {
	sinon.stub(io, 'emit');
	t.context.nodecg.sendMessageToBundle('messageName', 'bundleName', 'data');
	const stubArgs = io.emit.getCall(0).args;
	t.true(io.emit.calledOnce);
	t.is(stubArgs[0], 'message');
	t.same(stubArgs[1], {
		messageName: 'messageName',
		bundleName: 'bundleName',
		content: 'data'
	});
});
