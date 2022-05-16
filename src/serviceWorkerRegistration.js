export function register(config) {
    //check if browser support service worker
    if ('serviceWorker' in navigator) {
        //register after page loaded
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
            registerValidSW(swUrl, config);
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            console.log("service worker registered")
        })
        .catch((error) => {
            console.log('Error during service worker registration:', error);
        });
}

function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}

