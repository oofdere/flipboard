<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import { selected, type ObjectTypes, ComponentMap } from '$lib';
	import type { Writable } from 'svelte/store';

	export let object: Writable<ObjectTypes>;

	console.log('component', ComponentMap[$object.type]);

	function select() {
		console.log('select!');
		$selected = object;
	}

	$: console.log($selected);
</script>

<div
	class="absolute left-0 top-0 h-fit w-fit bg-fuchsia-400"
	use:draggable
	on:neodrag:end={(e) => console.log(e)}
>
	<div
		id="box"
		class="w-fit border-4 {$selected == object ? 'border-red-400' : ''}"
		style="--rotation: {$object.rotation}deg"
		on:mousedown={(e) => {
			e.stopPropagation();
			select();
		}}
		role="none"
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
	#box {
		rotate: var(--rotation);
	}
</style>
