import TaskPrefix from './prefix'
import gutil from 'gulp-util'

const Logger = (format) => {

    let _format;

    const _infoColor = gutil.colors.green;
    const _errorColor = gutil.colors.red;

    class Logger {

        constructor(format) {
            _format = format || `${TaskPrefix}: %s`;
        }

        info(message) {
            gutil.log(`${TaskPrefix}:`, _infoColor(message.toString()));
        }

        error(error) {
            gutil.log(`${TaskPrefix}:`, _errorColor(error.toString()));
        }
    }

    return new Logger(format);
}

export default Logger;
