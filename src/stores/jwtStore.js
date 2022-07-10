import { derived, writable } from 'svelte/store';
import jwt_decode from 'jwt-decode';

export const jwToken = writable(null);

export const parsedJWT = derived(jwToken, $token => $token ? jwt_decode($token) : {});
