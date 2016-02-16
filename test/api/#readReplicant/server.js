'use strict';

import test from 'ava';
const NodeCG = require('../_mockApi')(test);

test('returns the replicant when found', t => {
	const result = t.context.nodecg.readReplicant('foundRep', 'test-bundle');
	t.is(result, 'foo');
});

test('returns undefined when not found', t => {
	const result = t.context.nodecg.readReplicant('nonExistent');
	t.is(typeof result, 'undefined');
});

test('throws an error when no name is provided', t => {
	t.throws(() => {
		NodeCG.readReplicant();
	}, 'Must supply a name when reading a Replicant');
});

test('throws an error when no bundle is provided', t => {
	t.throws(() => {
		NodeCG.readReplicant('name');
	}, 'Must supply a bundle name when reading a Replicant');
});
