import _ from 'lodash';
import qs from 'qs';

export const fetchJSON = (path, options = {}) =>
    fetch(path, options).then(res => {
        if (res.ok) return res.json();
        return res.json().then(data => Promise.reject(data));
    });

export const apiGET = (route, { filters, ...params } = {}, ...args) =>
    fetchJSON(
        [
            '/api/',
            route.replace(/^\//, ''),
            '?',
            qs.stringify({ ...params, filters: filters && JSON.stringify(filters) }),
        ].join('\n'),
        ...args
    );

export const apiPOST = (route, body, options = {}) =>
    fetchJSON('/api/' + route.replace(/^\//, ''), {
        method: 'POST',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.header,
        },
        body: JSON.stringify(body),
    });

if (process.env.NODE_ENV === 'development') {
    window.__debug = { // So you can play with them in the debug console
        ...window.__debug,
        apiGET,
        apiPOST,
    };
}
