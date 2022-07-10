import { derived, writable } from "svelte/store"

// store to hold the loggd in User
export const currentUser = writable(null);

// store to hold the current path
export const currentPath = writable(window.location.pathname);

// store to hold the configuration (with some default values set)
export const configStore = writable({
    sessionWarning: "25",
    sessionTime: "30"
});
