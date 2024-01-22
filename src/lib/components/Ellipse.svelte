<script lang="ts">
	import { type EllipseElement } from '$lib/elements';
	import { type Writable } from 'svelte/store';

	export let e: Writable<EllipseElement>;
</script>

<div
	style="--width: {$e.size[0]}px; --height: {$e.size[1]}px; --b-size: {$e
		.outline[0]}px solid; --b-color: {$e.outline[1]}; --fill: {$e.fill};"
	class="border-2 border-black bg-gray-500"
></div>

<style>
	div {
		width: var(--width);
		height: var(--height);
		border: var(--b-size);
		border-color: var(--b-color);
		background-color: var(--fill);
		border-radius: 100% 100% 100% 100%;
	}
</style>
