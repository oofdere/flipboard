<script lang="ts">
	import { zoom } from '$lib';
	import { selected, type RectElement } from '$lib/elements';
	import { type Writable } from 'svelte/store';

	export let e: Writable<RectElement>;
</script>

<div
	style="--width: {$e.size[0]}px; --height: {$e.size[1]}px; --blend: {$e.blendMode}; --b-size: {$e
		.outline[0]}px solid; --b-color: {$e.outline[1]}; --fill: {$e.fill}; --rounded: {$e
		.roundness[0]}px {$e.roundness[1]}px {$e.roundness[2]}px {$e
		.roundness[3]}px; outline-width: {(128 / $zoom) * 4}px; rotate: {$e.rotation}deg;"
	class={$selected === e ? 'outline-dashed outline-secondary' : ''}
></div>

<style>
	div {
		width: var(--width);
		height: var(--height);
		border: var(--b-size);
		border-color: var(--b-color);
		background-color: var(--fill);
		border-radius: var(--rounded);
	}
</style>
