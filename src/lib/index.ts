import { writable } from "svelte/store";

export const mouseStatus = writable<"up" | "down">("up");
export const canvasPosition = writable<[number, number]>([0, 0]);
export const zoom = writable<number>(1);
