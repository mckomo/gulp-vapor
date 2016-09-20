import { exec as _exec, spawn as _spawn } from 'child_process';

export default class Shell {

    exec(command, callback) {
        return _exec(command, callback);
    }

    spawn(command, callback) {

        const program = command.start[0];
        const args = command.start[1];

        const proc = _spawn(program, args);

        if (callback) {
          callback(proc);
        }

        return proc;
    }

}
