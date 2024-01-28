<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.pcss';
	import { settings } from '$lib';

	const html: HTMLHtmlElement = document.querySelector('html')!;

	onMount(() => {
		html.dataset.theme = $settings.theme;
	});

	$: html.dataset.theme = $settings.theme;
</script>

<slot />
