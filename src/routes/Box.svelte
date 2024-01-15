<script lang="ts">
	import { draggable } from '@neodrag/svelte';
</script>

<div
	class="w-fit"
	use:draggable
	on:mousedown={(e) => {
		e.stopPropagation();
	}}
	role="none"
>
	<slot />
</div>
