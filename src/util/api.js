import { get } from 'svelte/store';
import { jwToken } from '../stores/jwtStore.js';

export const rootApiUrl = 'http://localhost:4200/';

export function httpGet(path) {
    return sendHttpRequest(path);
}

export function httpPost(path, data) {
    return sendHttpRequest(path, "POST", data);
}

export function httpPut(path, data) {
    return sendHttpRequest(path, "PUT", data);
}

export function httpDelete(path) {
    return sendHttpRequest(path, "DELETE");
}

async function sendHttpRequest(path, method = "GET", data) {
    const res = await fetch(rootApiUrl + path, {
        method,
        headers: createHeaders(),
        body: data && JSON.stringify(data)
    });

    if (res.headers.get("X-Authorization")) {
        jwToken.set(res.headers.get("X-Authorization"));
        console.log("Found Authorization header: ", res.headers.get("X-Authorization"));
    }

    var json = {};
    try {
        const result = await res.json();
        json = result;
    }catch(e) {
        console.log("received error:", e);

    } finally {
        console.log("Returned data is:", json);
    }
    return { ok: res.ok, data: json };
}

function createHeaders() {
    var headers;
    const token = get(jwToken);

    if (token) {
        headers = {
            'Content-Type': 'application/json',
            'X-Authorization': token
            };
    } else {
        headers = {
            'Content-Type': 'application/json'
            };       
    }

    return headers;
}