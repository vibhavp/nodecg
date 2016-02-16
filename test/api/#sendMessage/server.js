'use strict';

import test from 'ava';
const sinon = require('sinon');
require('../_mockApi')(test);

test('calls sendMessageToBundle', t => {
	sinon.stub(t.context.nodecg, 'sendMessageToBundle');
	t.context.nodecg.sendMessage('messageName', 'data');
	const stubArgs = t.context.nodecg.sendMessageToBundle.getCall(0).args;
	t.true(t.context.nodecg.sendMessageToBundle.calledOnce);
	t.is(stubArgs[0], 'messageName');
	t.is(stubArgs[1], 'test-bundle');
	t.is(stubArgs[2], 'data');
});
