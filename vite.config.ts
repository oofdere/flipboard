import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [sveltekit(), Icons({
		compiler: 'svelte',
		iconCustomizer(collection, icon, props) {
			props.width = '100%';
			props.height = '100%'
		}
	})]
});
