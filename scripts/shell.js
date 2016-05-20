import { exec as _exec, spawn as _spawn } from 'child_process';

export default class Shell {

    exec(command, callback) {
        return _exec(command, callback);
    }

    spawn(command, callback) {
        let proc = _spawn(command);
        callback(proc);

        return proc;
    }

}