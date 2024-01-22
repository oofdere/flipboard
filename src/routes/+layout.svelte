<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.pcss';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<slot />
