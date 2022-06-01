class RestController {
    constructor(adapter, config, sessionCache) {
        this.adapter = adapter;
        this.config = config;
        this.sessionCache = sessionCache;
    }

    getUser() {
        this.sessionCache.get()
            .then(session => {
                this.session = session;
            });
    }

    getAppId() {
        this.appId = this.config.get('APPLICATION_ID');
    }

    writeHeader() {
        this.headers = {}
        this.headers['Content-Type'] = 'application/json';
        this.headers['X-Application-Id'] = this.appId;
        if (this.session) {
            this.headers['X-Session-Token'] = this.session.token;
        }
    }

    getUrl(path) {
        const base = this.config.get('SERVER_URL');
        return new URL(base + path);
    }

    send2(url, method, data, query, session) {
        //add param if get
        if (method === 'GET') {
            for (const p in data) {
                url.searchParams.set(p, JSON.stringify(data[p]));
            }
        }
        if (query) {
            for (const p in query) {
                url.searchParams.set(p, JSON.stringify(query[p]));
            }
        }
        if (session) {
            this.headers['X-Session-Token'] = session;
        }
        return this.adapter.request(url, {method, body: JSON.stringify(data), headers: this.headers});
    }

    send(url, args) {
        if (args.query) {
            for (const p in args.query) {
                url.searchParams.set(p, JSON.stringify(args.query[p]));
            }
        }
        if (args.session) {
            this.headers['X-Session-Token'] = args.session;
        }
        if (args.headers) {
            this.headers = Object.assign(this.headers, args.headers);
        }
        const options = {
            method: args.method,
            body: args.body,
            headers: this.headers,
            raw: args.raw
        };
        return this.adapter.request(url, options);
    }


    init(path) {
        return Promise.resolve()
            .then(() => this.getAppId())
            .then(() => this.getUser())
            .then(() => this.writeHeader())
            .then(() => this.getUrl(path));
    }
    request(method, path, args) {
        if(args && args.body){
            args.body = JSON.stringify(args.body);
        }
        return this.init(path)
            .then((url) => this.send(url, {method, ...args}));
    }

    upload(path, file) {
        return this.init(path)
            .then((url) => {
                this.headers['Content-Type'] = file.type;
                return this.adapter.request(url, {method: 'POST', body: file, headers: this.headers});
            });
    }

}

export default RestController;
