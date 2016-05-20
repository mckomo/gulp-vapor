const Composition = (functions) => {

    let _functions;
    let _fallback;

    class Composition {

        constructor(functions) {
            _functions = functions;
        }

        withFallback(fallback) {
            _fallback = fallback;
            return this;
        }

        compose() {
            return functions
                .reverse()
                .reduce((composition, fn) => {
                    let callback = _fallback
                        ? _guard(composition)
                        : composition;

                    return () => fn(callback);
                });
        }
    }

    // Guard function calls fallback instead of callback if error was passed
    function _guard(callback) {
        return (error) => {
            if (error)
                return _fallback(error);

            return callback();
        }
    }

    return new Composition(functions);
};

export default Composition;