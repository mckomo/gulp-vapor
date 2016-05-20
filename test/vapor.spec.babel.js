'use strict';

// require('babel-core/register');

import {expect, assert} from 'chai';
import sinon from 'sinon';
import Vapor from '../scripts/vapor';

describe('Vapor', () => {

    let vapor;
    let callback;
    let shell;
    let exec;
    let spawn;

    const Proc = {
        kill: function () {
        }
    };

    beforeEach(() => {

        callback = sinon.spy();

        shell = {
            exec: sinon.spy(),
            spawn: sinon.spy()
        };

        exec = shell.exec; // alias
        spawn = shell.spawn; // alias

        vapor = Vapor(shell);
    });

    describe('#build', () => {

        it('executes the app build', () => {
            vapor.build(callback);

            assert(exec.calledWith('swift build'));
        });

        it('triggers the callback', () => {
            shell.exec = (command, callback) => {
                callback();
            };

            vapor.build(callback);

            assert(callback.calledOnce);
        });

        it('is chainable', () => {
            const result = vapor.build(callback);

            expect(result).to.eq(vapor);
        });

    });

    describe('#start', () => {

        it('spawns the app', () => {
            vapor.start(callback);

            assert(spawn.calledWith('.build/debug/App'));
        });

        it('triggers the callback', () => {
            vapor.start(callback);

            assert(callback.calledOnce);
        });

        it('is chainable', () => {
            const result = vapor.start(callback);

            expect(result).to.eq(vapor);
        });

    });

    describe('#stop', () => {

        it('stops started app', () => {

            let kill = sinon.spy();
            let proc = {kill: kill};

            shell.spawn = () => {
                return proc;
            };

            vapor.start(callback);
            vapor.stop(callback);

            assert(kill.calledOnce);
        });

        it('triggers the callback', () => {
            vapor.stop(callback);

            assert(callback.calledOnce);
        });

        it('is chainable', () => {
            const result = vapor.stop(callback);

            expect(result).to.eq(vapor);
        });

    });
});