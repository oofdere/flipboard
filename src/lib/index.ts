// place files you want to import through the `$lib` alias in this folder.

import { pack as basePack, type Enum } from "@oofdere/crabrave"
import { writable, type Writable } from "svelte/store"

export type Box = {
    pos: [number, number],
    scale: [number, number],
    rot: number,
    id: string,
    contents: Enum<Types>
}

// this is a crabrave enum
// 100% ADT copium right here
type Types = {
    text: Text
    rect: Rect
}

type Text = {
    text: string,
    font: string
}

type Rect = {
    ratio: number
}

export const pack = basePack<Types>

export const state = writable<Box[]>([])

export const selected: Writable<string | null> = writable(null)