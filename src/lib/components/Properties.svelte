<script lang="ts">
	import type { Elements } from '$lib/elements';
	import type { Writable } from 'svelte/store';

	export let element: Writable<Elements>;
</script>

<b>{$element.name}</b>
<hr />
<ul>
	<li>width: <input type="number" bind:value={$element.size[0]} /></li>
	<li>height: <input type="number" bind:value={$element.size[1]} /></li>
	<li>x: <input type="number" bind:value={$element.position[0]} /></li>
	<li>y: <input type="number" bind:value={$element.position[1]} /></li>
</ul>

<style>
	input {
		color: black;
	}
</style>
