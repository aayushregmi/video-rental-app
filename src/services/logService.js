import Raven from "raven-js";

function init () {
    Raven.config("https://6073505e4814473c8c5713d92a132041@o506182.ingest.sentry.io/5595575",{
        release: '1-0-0',
        environment: 'development-test'
    }).install();
}

function log(error) {
    Raven.log(error);
}

export default {
    init,
    log
};