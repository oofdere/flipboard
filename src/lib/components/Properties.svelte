<script lang="ts">
	import { elements, selected, type Elements } from '$lib/elements';
	import type { Writable } from 'svelte/store';

	export let element: Writable<Elements>;
	$: idx = $elements.indexOf(element);

	function del() {
		$elements.splice(idx, 1);
		$elements = $elements;
		$selected = null;
	}

	function head() {
		$elements.push(element);
		$elements = $elements;
		$elements.splice(idx, 1);
		$elements = $elements;
	}

	function tail() {
		$elements.splice(idx, 1);
		$elements = $elements;
		$elements.unshift(element);
		$elements = $elements;
	}
</script>

<b>{$element.name}</b>
<hr />
<ul>
	<li>width: <input type="number" bind:value={$element.size[0]} /></li>
	<li>height: <input type="number" bind:value={$element.size[1]} /></li>
	<li>x: <input type="number" bind:value={$element.position[0]} /></li>
	<li>y: <input type="number" bind:value={$element.position[1]} /></li>
	<li>rotation: <input type="number" bind:value={$element.rotation} /></li>
	<li><button class="" on:click={head}>send to top!</button></li>
	<li><button class="" on:click={tail}>send to back!</button></li>
	<li><button class="bg-red-800" on:click={del}>delete!</button> {idx}</li>
</ul>

<style>
	input {
		color: black;
	}
</style>
