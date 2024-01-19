# flipboard

adobe xd/figma/sketch if it didn't suck

## how it works
css transformations are the name of the game, instead of figuring out complicated shit like graphics and math and interaction handling, we kinda just let the dom do its thing

## elements

### canvas
the canvas stores all other elements and has a transformation and scale applied based on mouse inputs to allow users to pan and zoom. it's just a div with clipping disabled.

## state

### `$elements`
```ts
export const elements = writable<Writable<ElementTypes>[]>([]);
```
`elements` is a writable svelte store containing all of the elements (wrapped in writable svelte stores) in layer order. essentially it's a list of pointers to elements.

### `$selected`
```ts
export const selected = writable<Writable<ElementTypes>>(null);
```

`selected` is a svelte store containing null when nothing is selected or a writable store of the selected element. essentially a pointer to the selected element.

### `$mouseStatus`

```ts
export const mouseStatus = writable<"left" | "middle" | "right" | null>(null);
```

contains the currently pressed/held mouse button, or null if no button is pressed

### `$canvasPosition`
```ts
export const canvasPosition = writable<[number, number]>([0, 0]);
```

contains the position of the center of the canvas