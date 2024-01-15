<script lang="ts">
	import '../app.pcss';

	let cursor: MouseEvent | undefined = undefined;
	let x = 0;
	let y = 0;
	let zoom = 100;

	function handleCursor(e: MouseEvent) {
		cursor = e;
		console.log(e);
	}
</script>

<div
	class="pointer-events-auto fixed bottom-0 left-0 z-50 m-2 bg-black bg-opacity-50 p-1 text-white"
	draggable="false"
>
	{#if cursor}
		<p>({cursor.clientX}, {cursor.clientY})</p>
	{/if}

	<p>Mouse: nah</p>
	<ul>
		<li>x: <input type="range" bind:value={x} min="-100" max="100" /> {x}</li>
		<li>y: <input type="range" bind:value={y} min="-100" max="100" /> {y}</li>
		<li>z: <input type="range" bind:value={zoom} min="1" max="200" /> {zoom}%</li>
	</ul>
</div>

<div
	class="h-screen w-screen overflow-hidden overscroll-none"
	on:mousemove={handleCursor}
	role="img"
>
	<div id="canvas" class="w-min" style="--translation: {x}vw {y}vh; --zoom: {zoom}%">
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
