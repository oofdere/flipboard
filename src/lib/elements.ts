import { writable, type Writable } from "svelte/store"
import Rect from "./components/Rect.svelte"

export type RectElement = {
    type: "rect",
    name: string,
    position: [number, number],
    size: [number, number], // this maps to x and y
    roundness: [number, number, number, number],
    rotation: number
}

export type EllipseElement = {
    type: "ellipse",
    name: string,
    position: [number, number],
    size: [number, number], // this maps to x and y
    roundness: [number, number, number, number],
    rotation: number
}

export type Elements = RectElement

export const elements = writable<Writable<Elements>[]>([])
export const selected = writable<Writable<Elements> | null>(null)

// idk why these show up as types lol
export const ComponentMap = {
    'rect': Rect
}