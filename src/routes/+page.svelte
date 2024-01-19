<script lang="ts">
	import { canvasPosition, mouseLeft, mouseRight, cursorCanvas, cursorScreen } from '$lib';
	import { draggable } from '@neodrag/svelte';

	let clickPos: [number, number] = [0, 0];

	function handleCursor(e: MouseEvent) {
		e.stopPropagation();
		$cursorScreen = [e.clientX, e.clientY];
		if ($mouseLeft === 'down') {
			$canvasPosition[0] += e.clientX - clickPos[0];
			$canvasPosition[1] += e.clientY - clickPos[1];
			clickPos = [e.clientX, e.clientY];
		}
	}

	function click(e: MouseEvent) {
		e.stopPropagation();
		clickPos = [e.clientX, e.clientY];
		$mouseLeft = 'down';
	}

	function release(e: MouseEvent) {
		e.stopPropagation();
		$mouseLeft = 'up';
	}
</script>

<svelte:window on:mousedown={click} on:mouseup={release} on:mousemove={handleCursor} />

<div
	class="canvas fixed left-0 top-0 h-0 w-0"
	style="translate: {$canvasPosition[0]}px {$canvasPosition[1]}px;"
>
	<div class="pointer-events-none fixed left-0 top-0 h-screen w-1 bg-green-500"></div>
	<div class="pointer-events-none fixed left-0 top-0 h-1 w-screen bg-red-500"></div>
</div>

<p>{$mouseLeft} {$canvasPosition}</p>

<div class="fixed left-0 top-0" style="translate: {$cursorScreen[0]}px {$cursorScreen[1]}px;">
	<p>screen: {$cursorScreen}</p>
	<p>canvas: {$cursorCanvas}</p>
</div>

<style>
</style>
