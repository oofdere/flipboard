import { writable, type Writable } from "svelte/store"
import Rect from "./components/Rect.svelte"
import Ellipse from "./components/Ellipse.svelte"

export type BaseElement = {
    name: string,
    position: [x: number, y: number],
    rotation: number,
    fill: string,
    outline: [size: number, color: string],
    lockedRatio: boolean,
    blendMode: BlendMode,
    opacity: number
}

export const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'] as const
export type BlendMode = typeof blendModes[number];

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