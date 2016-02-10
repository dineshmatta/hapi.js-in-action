'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register([
    { register: require('./plugins/web') },
    { register: require('./plugins/auth'), options: {
        bell: {
            provider: 'facebook',
            isSecure: false,
            password: 'password',
            clientId: 'clientid',
            clientSecret: 'clientsecret'
        },
        cookies: {
            password: 'password',
            cookie: 'session',
            isSecure: false
        }
    } },
    { register: require('vision') },
    { register: require('bell') },
    { register: require('hapi-auth-cookie') }
], (err) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        console.log('Started server');
    });
});