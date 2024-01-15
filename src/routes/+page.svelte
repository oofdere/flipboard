<script lang="ts">
	import { state } from '$lib';
	import Box from './Box.svelte';
</script>

{#each $state as s}
	<Box>
		{#if s.contents[0] === 'text'}
			<p>{s.contents[1].text}</p>
		{/if}
	</Box>
{/each}
