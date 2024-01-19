// place files you want to import through the `$lib` alias in this folder.

import { writable, type Writable } from "svelte/store"
import TextComponent from "./Text.svelte"
import ImageComponent from "./Image.svelte"

export const ComponentMap = {
    text: TextComponent,
    image: ImageComponent
} as const


export type Box = {
    pos: [number, number],
    scale: [number, number],
    rot: number,
    id: string,
    contents: Text | Image
}


export type Text = {
    type: "text",
    text: string,
    position: [number, number],
    rotation: number,
    font: string,
    transform: string
    size: number
}

export type Image = {
    type: "image",
    image: number,
    rotation: number,
    size: [number, number]
    position: [number, number],
}

export type ObjectTypes = Text | Image

export const state = writable<Writable<ObjectTypes>[]>([])

export const selected: Writable<Writable<ObjectTypes> | null> = writable(null)
export const tool: Writable<"text" | "image" | null> = writable(null)
export const mouseStatus = writable(false)
export const zoom = writable(100)