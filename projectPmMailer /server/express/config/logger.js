module.exports = {

    appenders: {

        allLogs: { type: 'file', filename: './logs/app.log' },

        infoLogging: { type: 'file', filename: './logs/app-info.log' },

        'info': { type: 'logLevelFilter', appender: 'infoLogging', level: 'info' },
        // console: { type: 'console' },

        debugLogging: { type: 'file', filename: './logs/app-debug.log' },

        'debug': { type: 'logLevelFilter', appender: 'debugLogging', level: 'debug' },
        // console: { type: 'console' }
    },
    categories: {
        default: { appenders: ['debug', 'info', 'allLogs'], level: 'debug' }
    }
};