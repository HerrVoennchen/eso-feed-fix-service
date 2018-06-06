'use strict';

const Hapi = require('hapi');
const axios = require('axios');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/esofeed',
    handler: (request, h) => {
        return axios
            .get('http://files.elderscrollsonline.com/rss/de/eso-rss.xml')
            .then(res => res.data)
            .then(xml => {
                xml = xml.replace('&nbsp;', '&#160;');
                return h
                    .response(xml)
                    .type('application/xml')
                    .code(200);
            })
            .catch(error => {
                console.error(error);
                return h.response(error).code(500);
            });
    }
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
