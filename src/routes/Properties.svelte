<script lang="ts">
	import type { ObjectTypes } from '$lib';
	import type { Writable } from 'svelte/store';

	export let object: Writable<ObjectTypes>;
</script>

<div
	on:mousedown={(e) => {
		e.stopPropagation();
	}}
	role="none"
>
	<b>{$object.type}</b>

	<hr class="p-1" />

	<ul>
		<li>
			position: x <input type="number" class="w-16" bind:value={$object.position[0]} /> y
			<input type="number" class="w-16" bind:value={$object.position[1]} />
		</li>
	</ul>

	<hr class="m-1" />

	{#if $object.type === 'text'}
		<ul>
			<li>
				text: <input bind:value={$object.text} class="" />
			</li>
			<li>
				rotation:
				<input type="range" bind:value={$object.rotation} class="" min="-360" max="360" />
				<input type="number" bind:value={$object.rotation} class=" w-16" />
			</li>
		</ul>
	{/if}

	<p class="w-32">{JSON.stringify($object)}</p>
</div>

<style>
	input {
		color: black;
	}
</style>
