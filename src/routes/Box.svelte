<script lang="ts">
	import { draggable } from '@neodrag/svelte';
</script>

<div class="w-fit" use:draggable>
	<slot />
</div>
