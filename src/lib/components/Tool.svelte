<script lang="ts">
	import { tool, type Tools } from '$lib';
	import type { SvelteComponent } from 'svelte';

	export let id: Tools;
	export let disabled: boolean = false;
</script>

<li class="">
	<div class="tooltip tooltip-right" data-tip={id}>
		<button
			class="btn btn-square m-0 rounded-none p-0 {$tool === id ? 'btn-primary' : 'btn-ghost'}"
			on:click={() => {
				$tool = id;
			}}
			{disabled}
		>
			<slot />
		</button>
	</div>
</li>
