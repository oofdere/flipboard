<script lang="ts">
	import { selected, type Elements } from '$lib/elements';
	import type { Writable } from 'svelte/store';

	export let e: Writable<Elements>;

	function select() {
		$selected = e;
	}
</script>

<button
	class="btn w-full rounded-none {$selected === e ? 'btn-secondary' : 'btn-ghost'}"
	on:click={select}
>
	{$e.name}
</button>
