<script lang="ts">
	import { settings } from '$lib';
	import local from '$lib/localstorage';
	import { onMount } from 'svelte';

	const html: HTMLHtmlElement = document.querySelector('html')!;

	onMount(() => {
		if (html) {
			html.dataset.theme = $settings.theme;
		}
	});

	$: html.dataset.theme = $settings.theme;

	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset'
	];
</script>

<select bind:value={$settings.theme} class="input input-primary">
	{#each themes as t}
		<option value={t}>{t}</option>
	{/each}
</select>
