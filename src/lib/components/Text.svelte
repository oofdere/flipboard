<script lang="ts">
	import { zoom } from '$lib';
	import { selected, type TextElement } from '$lib/elements';
	import { type Writable } from 'svelte/store';

	export let e: Writable<TextElement>;
</script>

<div
	style="--blend: {$e.blendMode}; --border: {$e.outline[0]}px {$e
		.outline[1]}; --fill: {$e.fill}; outline-width: {(128 / $zoom) *
		4}px; rotate: {$e.rotation}deg; --size: {$e.size}pt"
	class="{$selected === e ? 'outline-dashed outline-secondary' : ''} w-full"
>
	<p
		class=" w-full whitespace-nowrap caret-primary {$selected === e ? '' : 'pointer-events-none'}"
		contenteditable="true"
		bind:innerText={$e.text}
	></p>
</div>

<style>
	div {
		font-size: var(--size);
		color: var(--fill);
		-webkit-text-stroke: var(--border);
		border-radius: var(--rounded);
	}
</style>
