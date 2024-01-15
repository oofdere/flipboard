<script lang="ts">
	import { state, pack } from '$lib';
	//import { pack } from '@oofdere/crabrave';
	import { nanoid } from 'nanoid';
	import '../app.pcss';
	import { browser } from '$app/environment';

	let cursor: MouseEvent | undefined = undefined;
	let x = 0;
	let y = 0;
	let zoom = 100;

	function handleCursor(e: MouseEvent) {
		cursor = e;
	}

	function addText() {
		$state.push({
			pos: [0, 0],
			scale: [1, 1],
			rot: 0,
			id: nanoid(),
			contents: pack('text', {
				text: "what you're referring to as GNU/Linux is actually... wait a minute",
				font: 'whatever'
			})
		});
		$state = $state;
	}

	if (browser) {
		addEventListener('wheel', (e) => {
			console.log(e);
			zoom = Math.max(zoom + e.deltaY * -1, 1);
		});
	}
</script>

<div
	class="pointer-events-auto fixed bottom-0 left-0 z-50 m-2 bg-black bg-opacity-50 p-1 text-white"
	draggable="false"
>
	{#if cursor}
		<p>({cursor.clientX}, {cursor.clientY})</p>
	{/if}
	<ul>
		<li>x: <input type="range" bind:value={x} min="-100" max="100" /> {x}</li>
		<li>y: <input type="range" bind:value={y} min="-100" max="100" /> {y}</li>
		<li>z: <input type="range" bind:value={zoom} min="1" max="200" /> {zoom}%</li>
	</ul>
</div>

<div
	class="pointer-events-auto fixed bottom-0 right-0 z-50 m-2 bg-black bg-opacity-50 p-1 text-white"
	draggable="false"
>
	<button on:click={addText}>Add text</button>
</div>

<div
	class="h-screen w-screen overflow-hidden overscroll-none"
	on:mousemove={handleCursor}
	role="img"
>
	<div id="canvas" class="w-min" style="--translation: {x}vw {y}vh; --zoom: {zoom}%">
		<p>+</p>
		<slot />
	</div>
</div>

<style>
	#canvas {
		translate: var(--translation);
		scale: var(--zoom);
		background-color: aqua;
	}
</style>
