import { derived, writable } from "svelte/store";

export const canvasPosition = writable<[number, number]>([0, 0]);
export const zoom = writable<number>(100);
export const zoomRatio = derived(zoom, x => x / 100);

export const mouseLeft = writable<"up" | "down">("up")
export const mouseRight = writable<"up" | "down">("up")
export const cursorScreen = writable<[number, number]>([0, 0])
export const cursorCanvas = derived([canvasPosition, cursorScreen, zoomRatio], ([b, a, c]) => [(a[0] - b[0]) / c, (a[1] - b[1]) / c] as [number, number])

export type Tools = "pan" | "select" | "text" | "rectangle" | "ellipse" | "triangle"
export const tool = writable<Tools>("pan")

export const settings = writable({ gpuAcceleration: false, zoomMultiplier: 10 })