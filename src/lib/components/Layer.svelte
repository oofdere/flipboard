<script lang="ts">
	import { selected, type Elements } from '$lib/elements';
	import type { Writable } from 'svelte/store';
	import FluentEyeShow16Filled from '~icons/fluent/eye-show-16-filled';
	import FluentEyeOff16Regular from '~icons/fluent/eye-off-16-regular';

	export let e: Writable<Elements>;

	function select() {
		$selected = e;
	}

	function hide() {
		$e.hidden = !$e.hidden;
	}
</script>

<div class="flex">
	<button
		class="btn btn-sm m-0 w-6 rounded-none p-0 {$e.hidden
			? 'btn-primary'
			: $selected === e
				? 'btn-secondary'
				: 'btn-ghost'}"
		on:click={hide}
	>
		{#if $e.hidden}
			<FluentEyeOff16Regular />
		{:else}
			<FluentEyeShow16Filled />
		{/if}
	</button>

	<button
		class="btn btn-sm grow justify-start rounded-none p-1 text-right {$selected === e
			? 'btn-secondary'
			: 'btn-ghost'}"
		on:click={select}
	>
		{$e.name}
	</button>
</div>
