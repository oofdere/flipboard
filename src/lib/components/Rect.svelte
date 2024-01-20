<script lang="ts">
	import { type RectElement } from '$lib/elements';
	import { type Writable } from 'svelte/store';

	export let e: Writable<RectElement>;
</script>

<div
	style="--width: {$e.size[0]}px; --height: {$e.size[1]}px;"
	class="border-2 border-black bg-gray-500"
></div>

<style>
	div {
		width: var(--width);
		height: var(--height);
	}
</style>
