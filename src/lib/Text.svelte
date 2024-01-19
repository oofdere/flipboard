<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { type Text } from '$lib';

	export let object: Writable<Text>;

	console.log('text:', object);
</script>

<p class="select-none text-center" contenteditable="false" bind:innerText={$object.text}>
	{$object.text} a
</p>
