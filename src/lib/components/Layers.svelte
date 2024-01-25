<script lang="ts">
	import { elements } from '$lib/elements';
	import Layer from './Layer.svelte';
</script>

<div class="left-0 h-screen w-48 overflow-y-auto bg-base-200 bg-opacity-80 backdrop-blur-md">
	<div class="flex flex-col-reverse">
		{#each $elements as e}
			<Layer {e} />
		{/each}
	</div>
</div>
