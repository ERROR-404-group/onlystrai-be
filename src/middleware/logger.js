'use strict';

function logger(request, response, next) {
    console.log('logger be loggin');
    next();
}

module.exports = logger;