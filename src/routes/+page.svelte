<script lang="ts">
	import { state } from '$lib';
	import Box from './Box.svelte';
	import Text from '$lib/Text.svelte';

	import { ComponentMap } from '$lib';

	console.log(ComponentMap);
</script>

{#each $state as object}
	<Box {object}></Box>
{/each}
