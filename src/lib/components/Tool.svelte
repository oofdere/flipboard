<script lang="ts">
	import { tool, type Tools } from '$lib';
	import type { SvelteComponent } from 'svelte';

	export let id: Tools;
</script>

<li class="">
	<button
		class="btn btn-square rounded-none {$tool === id ? 'btn-primary' : 'btn-ghost'}"
		on:click={() => {
			$tool = id;
		}}
	>
		<slot />
	</button>
</li>
