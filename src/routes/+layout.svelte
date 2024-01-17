<script lang="ts">
	import { state, pack, selected } from '$lib';
	//import { pack } from '@oofdere/crabrave';
	import { nanoid } from 'nanoid';
	import '../app.pcss';
	import { browser } from '$app/environment';

	let cursor: MouseEvent | undefined = undefined;
	let x = 0;
	let y = 0;
	let zoom = 100;
	let mouseStatus: string = 'nah';
	let clickPos: [number, number] = [0, 0];
	let canvas: HTMLElement;
	let zoomMultiplier = 1;
	let dragMultiplier = 1;
	let lineTransparency = 0;

	function handleCursor(e: MouseEvent) {
		cursor = e;
		if (mouseStatus === 'down') {
			console.log(e.target, canvas, clickPos, e.x, e.y, e.movementX, e.movementY);

			x += (e.movementX / (zoom / 100)) * dragMultiplier;
			y += (e.movementY / (zoom / 100)) * dragMultiplier;
		}
	}

	function click(e: MouseEvent) {
		clickPos = [e.clientX, e.clientY];
		$selected = null;
		mouseStatus = 'down';
	}

	function release(e: MouseEvent) {
		mouseStatus = 'up';
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
			zoom = Math.max(zoom + e.deltaY * zoomMultiplier * -1, 1);
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
	<p>Mouse: {mouseStatus}</p>
	<ul>
		<li>
			drag: <input type="range" bind:value={dragMultiplier} min="0" max="2" step="0.001" />
			{dragMultiplier}x
		</li>
		<li>
			zoom: <input type="range" bind:value={zoomMultiplier} min="0" max="2" step="0.001" />
			{zoomMultiplier}x
		</li>
		<li>
			lines: <input type="range" bind:value={lineTransparency} min="0" max="100" step="0.001" />
			{lineTransparency}%
		</li>
	</ul>
</div>

<div
	class="pointer-events-auto fixed bottom-0 right-0 z-50 m-2 bg-black bg-opacity-50 p-1 text-white"
	draggable="false"
>
	<button on:click={addText}>Add text</button>
</div>

<div class="fixed right-0 top-0 m-2 bg-black bg-opacity-50 p-1 text-white">
	{#if $selected === null}
		<p>no object selected :(</p>
	{:else}
		<p>object: {$selected}</p>
	{/if}
</div>

<div
	class="h-screen w-screen overflow-hidden overscroll-none"
	on:mousemove={handleCursor}
	on:mousedown={click}
	on:mouseup={release}
	role="presentation"
	bind:this={canvas}
	id="container"
	style="--alpha: {lineTransparency}%; --translation: {(x + 50) * (zoom / 100)}px {(y + 50) *
		(zoom / 100)}px; --zoom: {(zoom / 100) * 20}px"
>
	<div
		id="canvas"
		class="h-full w-full"
		style="--translation: {(x + 50) * (zoom / 100)}px {(y + 50) * (zoom / 100)}px; --zoom: {zoom}%"
	>
		<p class="w-min bg-blue-500">+</p>
		<slot />
	</div>
</div>

<div
	class="fixed top-0 -z-50"
	id="grid"
	style="--alpha: {lineTransparency}%; --translation: {x * (zoom / 100)}px {y *
		(zoom / 100)}px; --zoom: {zoom}px"
></div>

<style>
	#canvas {
		translate: var(--translation);
		scale: var(--zoom);
	}

	#grid {
		width: 200vw;
		height: 200vh;
		background-image: url('/transparency-grid.svg');
		background-size: var(--zoom);
		opacity: var(--alpha);
		background-position: var(--translation);
		translate: -100vh -100vh;
	}
</style>
