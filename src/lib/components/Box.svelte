<script lang="ts">
	import { settings, zoom, zoomRatio } from '$lib';
	import { ComponentMap, selected, type Elements } from '$lib/elements';
	import { draggable } from '@neodrag/svelte';
	import { type Writable } from 'svelte/store';

	export let e: Writable<Elements>;

	$: position = { x: $e.position[0], y: $e.position[1] };
	$: active = $selected === e;
</script>

{#if !$e.hidden}
	<div
		class="fixed top-0 cursor-auto"
		style="mix-blend-mode: {$e.blendMode}; opacity: {$e.opacity}%"
		on:mousedown={(event) => {
			event.stopPropagation();
			$selected = e;
		}}
		on:click={(event) => {
			event.stopPropagation();
			$selected = e;
		}}
		role="none"
		use:draggable={{
			position,
			onDrag: ({ offsetX, offsetY }) => {
				$e.position = [offsetX, offsetY];
			},
			gpuAcceleration: $settings.gpuAcceleration
		}}
	>
		<svelte:component this={ComponentMap[$e.type]} {e}></svelte:component>
	</div>
{/if}
