<script lang="ts">
	import { elements, selected, type Elements } from '$lib/elements';
	import type { Writable } from 'svelte/store';
	import MaterialSymbolsLockOpenOutlineRounded from '~icons/material-symbols/lock-open-outline-rounded';
	import MaterialSymbolsLock from '~icons/material-symbols/lock';
	export let element: Writable<Elements>;
	$: idx = $elements.indexOf(element);

	function del() {
		$elements.splice(idx, 1);
		$elements = $elements;
		$selected = null;
	}

	function head() {
		$elements.push(element);
		$elements = $elements;
		$elements.splice(idx, 1);
		$elements = $elements;
	}

	function tail() {
		$elements.splice(idx, 1);
		$elements = $elements;
		$elements.unshift(element);
		$elements = $elements;
	}
</script>

<div class="flex w-full flex-col gap-2 p-2">
	<div class="flex w-full items-center">
		<input
			class="input input-ghost w-full p-0 text-xl"
			contenteditable="true"
			bind:value={$element.name}
		/>
		<p>{idx}</p>
	</div>
	<hr />
	<ul class="flex flex-col gap-2">
		<li class="join">
			<p class="btn btn-primary join-item btn-sm">x</p>
			<input
				type="number"
				class="input join-item input-bordered input-sm w-full max-w-xs"
				bind:value={$element.position[0]}
			/>
			<p class="btn btn-error join-item btn-sm p-0">
				<MaterialSymbolsLockOpenOutlineRounded class="p-1" />
			</p>
			<input
				type="number"
				class="input join-item input-bordered input-sm w-full max-w-xs"
				bind:value={$element.position[1]}
			/>
			<p class="btn btn-secondary join-item btn-sm">y</p>
		</li>
		{#if $element.size}
			<li class="join">
				<p class="btn btn-primary join-item btn-sm">w</p>
				<input
					type="number"
					class="input join-item input-bordered input-sm w-full max-w-xs"
					bind:value={$element.size[0]}
				/>
				<p class="btn btn-error join-item btn-sm p-0">
					<MaterialSymbolsLockOpenOutlineRounded class="p-1" />
				</p>
				<input
					type="number"
					class="input join-item input-bordered input-sm w-full max-w-xs"
					bind:value={$element.size[1]}
				/>
				<p class="btn btn-secondary join-item btn-sm">h</p>
			</li>
		{/if}
		<li>rotation: <input class="input input-sm" type="number" bind:value={$element.rotation} /></li>
		<li>fill: <input type="color" bind:value={$element.fill} /></li>
		<li>
			outline:
			<div class="join max-w-full overflow-clip">
				<input class="input join-item input-sm" type="number" bind:value={$element.outline[0]} />
				<input class="join-item m-0 w-16 p-0" type="color" bind:value={$element.outline[1]} />
			</div>
		</li>
		<li class="join">
			<button class="btn btn-primary join-item btn-sm grow" on:click={head}>front!</button><button
				class="btn btn-secondary join-item btn-sm grow"
				on:click={tail}>back!</button
			>
		</li>
		<li><button class="btn btn-error btn-xs w-full" on:click={del}>delete!</button></li>
		<hr />

		{#if $element.type === 'rect'}
			<ul>
				<li class="">
					roundness:
					<div class="input-bordered grid grid-cols-2 overflow-hidden rounded-xl border-[1px]">
						<input
							class="input input-bordered input-ghost input-sm rounded-none"
							type="number"
							bind:value={$element.roundness[0]}
						/>
						<input
							class="input input-bordered input-ghost input-sm rounded-none"
							type="number"
							bind:value={$element.roundness[1]}
						/>
						<input
							class="input input-bordered input-ghost input-sm rounded-none"
							type="number"
							bind:value={$element.roundness[2]}
						/>
						<input
							class="input input-bordered input-ghost input-sm rounded-none"
							type="number"
							bind:value={$element.roundness[3]}
						/>
					</div>
				</li>
			</ul>
		{/if}
	</ul>
</div>
