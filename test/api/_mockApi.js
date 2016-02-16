'use strict';

const mockery = require('mockery');

class Replicant {
	constructor() {
		this.value = 'foo';
	}
}

module.exports = (test, emitter) => {
	if (!emitter) {
		const EventEmitter = require('events').EventEmitter;
		emitter = new EventEmitter();
	}

	mockery.enable({
		warnOnReplace: true,
		warnOnUnregistered: false
	});

	mockery.registerMock('./replicant', Replicant);

	mockery.registerMock('./server', {
		getIO() {
			return emitter;
		}
	});

	mockery.registerMock('./config', {filteredConfig: {}});

	mockery.registerMock('./util', {});

	mockery.registerMock('./replicator', {
		find(name, bundle) {
			if (name === 'foundRep' && bundle === 'test-bundle') {
				return new Replicant();
			}
		}
	});

	mockery.registerMock('./logger', class Logger {
		trace() {}

		error() {}
	});

	mockery.registerAllowable('../../lib/api');
	const NodeCG = require('../../lib/api');

	test.beforeEach(t => {
		t.context.nodecg = new NodeCG({
			name: 'test-bundle'
		}, process.env.browser ? emitter : null);
	});

	return NodeCG;
};
