import { writable } from "svelte/store";

export default function local<T>(key: string, fallback: T) {
    // returns a writable store connected to localStorage[id]

    let currentValue = localStorage.getItem(key);
    if (!currentValue) {
        currentValue = JSON.stringify(fallback)
        localStorage.setItem(key, JSON.stringify(fallback))
    }
    const { subscribe, set } = writable<T>(JSON.parse(currentValue));

    return {
        subscribe,
        set: (val: T) => {
            localStorage.setItem(key, JSON.stringify(val));
            set(val);
        },
        index: key
    }
}