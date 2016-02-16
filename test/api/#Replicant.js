'use strict';

import test from 'ava';

require('./_mockApi')(test);

test('constructs a new Replicant', t => {
	// Returns the mock due to how mockery hooks require calls.
	const Replicant = require('./replicant');
	const rep = new t.context.nodecg.Replicant('testRep');
	t.true(rep instanceof Replicant);
});
