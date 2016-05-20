import TaskPrefix from './prefix'

const Logger = (format) => {

    let _format;

    class Logger {

        constructor(format) {
            _format = format || `${TaskPrefix}: %s`;
        }

        info(message) {
            console.log(_format, message.toString());
        }

        error(error) {
            console.error(_format, error.toString());
        }
    }

    return new Logger(format);
}

export default Logger;