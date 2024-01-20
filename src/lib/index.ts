import { derived, writable } from "svelte/store";

export const canvasPosition = writable<[number, number]>([0, 0]);
export const zoom = writable<number>(1);

export const mouseLeft = writable<"up" | "down">("up")
export const mouseRight = writable<"up" | "down">("up")
export const cursorScreen = writable<[number, number]>([0, 0])
export const cursorCanvas = derived([canvasPosition, cursorScreen], ([b, a]) => [a[0] - b[0], a[1] - b[1]] as [number, number])

export const tool = writable<"pan" | "select" | "text" | "rectangle" | "ellipse" | "triangle">("pan")

export const settings = writable<{ gpuAcceleration: boolean }>({ gpuAcceleration: false })