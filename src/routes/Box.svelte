<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import { selected, type ObjectTypes, ComponentMap, mouseStatus, zoom } from '$lib';
	import type { Writable } from 'svelte/store';

	export let object: Writable<ObjectTypes>;

	console.log('component', ComponentMap[$object.type]);

	function select() {
		console.log('select!');
		$selected = object;
	}

	function handleCursor(e: MouseEvent) {
		if ($selected === object) {
			e.stopPropagation();
			console.log($mouseStatus, e);
			if ($mouseStatus) {
				$object.position[0] += (e.clientX - $object.position[0]) / ($zoom / 100);
				$object.position[1] += (e.clientX - $object.position[0]) / ($zoom / 100);
				$object.position = $object.position;
				//y += (e.movementY / (zoom / 100)) * dragMultiplier;
			}
		}
	}

	function click(e: MouseEvent) {
		e.stopPropagation();
		$selected = object;
		$mouseStatus = true;
	}

	function release(e: MouseEvent) {
		$mouseStatus = false;
	}
</script>

<div
	class="box fixed left-0 top-0 h-fit w-fit bg-fuchsia-400"
	style="rotate: {$object.rotation}deg; translate: {$object.position[0]}px {$object.position[1]}px;"
>
	<div
		class="w-fit border-4 {$selected == object ? 'border-red-400' : ''}"
		on:mousedown={click}
		role="none"
		on:mousemove={handleCursor}
		on:mouseup={release}
	>
		{#if $selected == object}
			<div class="pointer-events-none fixed -top-7 w-full text-center">
				<button class="pointer-events-auto bg-white">placeholder</button>
			</div>
		{/if}
		<svelte:component this={ComponentMap[$object.type]} {object}></svelte:component>
	</div>
</div>

<style>
	div {
		transform-origin: 50% 50%;
	}
</style>
