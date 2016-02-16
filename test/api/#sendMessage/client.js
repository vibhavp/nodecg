'use strict';

import test from 'ava';
const sinon = require('sinon');
require('../_mockApi')(test);

test('accepts a callback & has an optional "data" argument', t => {
	sinon.stub(t.context.nodecg, 'sendMessageToBundle');
	const cb = function () {};
	t.context.nodecg.sendMessage('messageName', cb);
	const stubArgs = t.context.nodecg.sendMessageToBundle.getCall(0).args;
	t.true(t.context.nodecg.sendMessageToBundle.calledOnce);
	t.is(stubArgs[0], 'messageName');
	t.is(stubArgs[1], 'test-bundle');
	t.is(stubArgs[2], null);
	t.is(stubArgs[3], cb);
});
