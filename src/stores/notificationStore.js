import { writable } from "svelte/store";

function createNotificationStore() {
    const { subscribe, set, update } = writable([]);

    var nextId = 1;

    return {
        subscribe,
        clearAll() { set([]) },
        addError(text) { 
            update(store => [...store, {type: "error", msg: text, id: nextId++}]);
        },
        addWarning(text) { 
            update(store => [...store, {type: "warning", msg: text, id: nextId++}]);
        },
        addInfo(text) { 
            update(store => [...store, {type: "info", msg: text, id: nextId++}]);
        },
        remove(id) {
            update(store => [...store.filter(obj => obj.id !== id)]);
        }
    };
}

export const notificationStore = createNotificationStore();