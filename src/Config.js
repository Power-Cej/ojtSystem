const config = {
    SERVER_URL: '',
    APPLICATION_ID: null,
    MASTER_KEY: null,
    SESSION_TOKEN: null,
}
const Config = {
    get: function (key) {
        if (config.hasOwnProperty(key)) {
            return config[key];
        }
        throw new Error('Configuration key not found: ' + key);
    },
    set: function (key, value) {
        config[key] = value;
    }
}

export default Config;
