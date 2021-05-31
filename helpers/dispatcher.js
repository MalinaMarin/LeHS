class Dispatcher {
    listeners = {
        GET: [],
        PUT: [],
        POST: [],
        DELETE: [],
        CONNECT: [],
    };

    on(method, url, fct) {
        this.listeners[method.toUpperCase()].push([url, fct, false]);
    }

    use(url, dispatcher) {
        if (dispatcher.listeners) {
            for (const method in dispatcher.listeners) {
                if (dispatcher.listeners.hasOwnProperty(method))
                    for (const [path, handler] of dispatcher.listeners[
                        method
                    ]) {
                        this.listeners[method].push([
                            url + path,
                            handler,
                            false,
                        ]);
                    }
            }
            return;
        }

        for (const listenerMethod in this.listeners)
            if (this.listeners.hasOwnProperty(listenerMethod)) {
                this.listeners[listenerMethod].push([
                    url,
                    dispatcher,
                    true,
                ]);
            }
    }

   
}

module.exports = Dispatcher;