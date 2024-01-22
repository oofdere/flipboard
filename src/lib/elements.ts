import { writable, type Writable } from "svelte/store"
import Rect from "./components/Rect.svelte"
import Ellipse from "./components/Ellipse.svelte"

export type BaseElement = {
    name: string,
    position: [x: number, y: number],
    rotation: number,
    fill: string,
    outline: [size: number, color: string],
    lockedRatio: boolean
}

export type RectElement = BaseElement & {
    type: "rect",
    size: [length: number, width: number], // this maps to x and y
    roundness: [tl: string, tr: string, br: string, bl: string],
}

export type EllipseElement = BaseElement & {
    type: "ellipse",
    size: [length: number, width: number], // this maps to x and y
}

export type Elements = RectElement | EllipseElement

export const elements = writable<Writable<Elements>[]>([])
export const selected = writable<Writable<Elements> | null>(null)

// idk why these show up as types lol
export const ComponentMap = {
    'rect': Rect,
    'ellipse': Ellipse
}