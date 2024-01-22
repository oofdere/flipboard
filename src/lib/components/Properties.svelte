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

<div class="p-2">
	<b class="" contenteditable="true" bind:innerText={$element.name}></b>
	<hr />
	<ul>
		<li class="join">
			<p class="btn join-item btn-sm">x:</p>
			<input
				type="number"
				class="input join-item input-bordered input-sm w-full max-w-xs"
				bind:value={$element.position[0]}
			/>
			<p class="btn join-item btn-sm">y:</p>
			<input
				type="number"
				class="input join-item input-bordered input-sm w-full max-w-xs"
				bind:value={$element.position[1]}
			/>
			<button></button>
		</li>
		<li></li>
		<li>rotation: <input type="number" bind:value={$element.rotation} /></li>
		<li>fill: <input type="color" bind:value={$element.fill} /></li>
		<li>
			outline: <input type="color" bind:value={$element.outline[1]} />
			<input type="number" bind:value={$element.outline[0]} />
		</li>
		<li><button class="" on:click={head}>send to top!</button></li>
		<li><button class="" on:click={tail}>send to back!</button></li>
		<li><button class="bg-red-800" on:click={del}>delete!</button> {idx}</li>
	</ul>
	<hr />
	{#if $element.size}
		<ul>
			<li>width: <input type="number" bind:value={$element.size[0]} /></li>
			<li>height: <input type="number" bind:value={$element.size[1]} /></li>
		</ul>
	{/if}
	{#if $element.type === 'rect'}
		<ul>
			<li>
				roundness:
				<input type="number" bind:value={$element.roundness[0]} />
				<input type="number" bind:value={$element.roundness[1]} />
				<input type="number" bind:value={$element.roundness[2]} />
				<input type="number" bind:value={$element.roundness[3]} />
			</li>
		</ul>
	{/if}
</div>
