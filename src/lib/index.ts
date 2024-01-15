// place files you want to import through the `$lib` alias in this folder.

import { pack as basePack, type Enum } from "@oofdere/crabrave"
import { writable } from "svelte/store"

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
}

type Text = {
    text: string,
    font: string
}

export const pack = basePack<Types>

export const state = writable<Box[]>([])