<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

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

<select data-choose-theme class="input input-primary">
	<option value="">system</option>
	<option value="light">light</option>
	<option value="dark">dark</option>

	{#each themes as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select>
