<script lang="ts">
	import { settings } from '$lib';
	import { ComponentMap, selected, type Elements } from '$lib/elements';
	import { draggable } from '@neodrag/svelte';
	import { type Writable } from 'svelte/store';

	export let e: Writable<Elements>;

	$: position = { x: $e.position[0], y: $e.position[1] };
</script>

<div
	class="fixed top-0"
	on:mousedown={(event) => {
		event.stopPropagation();
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
		gpuAcceleration: false
	}}
>
	<div>
		<svelte:component this={ComponentMap[$e.type]} {e}></svelte:component>
	</div>
</div>
