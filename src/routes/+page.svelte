<script lang="ts">
	import { state } from '$lib';
	import Box from './Box.svelte';
	import Text from './Text.svelte';
</script>

{#each $state as s}
	<Box>
		{#if s.contents[0] === 'text'}
			<Text text={s.contents[1].text}></Text>
		{/if}
	</Box>
{/each}
