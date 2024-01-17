<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import { selected } from '$lib';

	export let id: string;

	function select() {
		$selected = id;
	}
</script>

<div
	class="w-fit border-2 {$selected === id ? 'border-blue-400' : ''}"
	use:draggable
	on:mousedown={(e) => {
		e.stopPropagation();
	}}
	role="none"
>
	{#if $selected === id}
		<div class="pointer-events-none fixed -top-7 w-full text-center">
			<button class="pointer-events-auto bg-white">placeholder</button>
		</div>
	{/if}
	<div on:mousedown={select} class="w-fit" role="none">
		<slot />
	</div>
</div>
