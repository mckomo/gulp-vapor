import { exec as _exec, spawn as _spawn } from 'child_process';

export default class Shell {

    exec(command, callback) {
        return _exec(command, callback);
    }

    spawn(program, args = [], options = {}, callback) {

        const proc = _spawn(program, args, options);

        if (callback) {
          callback(proc);
        }

        return proc;
    }

}
