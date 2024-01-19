<script lang="ts">
	import { canvasPosition, mouseStatus } from '$lib';
	import { draggable } from '@neodrag/svelte';

	let clickPos: [number, number] = [0, 0];

	function handleCursor(e: MouseEvent) {
		e.stopPropagation();
		if ($mouseStatus === 'down') {
			$canvasPosition[0] += e.clientX - clickPos[0];
			$canvasPosition[1] += e.clientY - clickPos[1];
			clickPos = [e.clientX, e.clientY];
		}
	}

	function click(e: MouseEvent) {
		e.stopPropagation();
		clickPos = [e.clientX, e.clientY];
		$mouseStatus = 'down';
	}

	function release(e: MouseEvent) {
		e.stopPropagation();
		$mouseStatus = 'up';
	}
</script>

<svelte:window on:mousedown={click} on:mouseup={release} on:mousemove={handleCursor} />

<div
	class="canvas fixed left-0 top-0 h-0 w-0"
	style="translate: {$canvasPosition[0]}px {$canvasPosition[1]}px;"
>
	<div class="pointer-events-none fixed left-0 top-0 h-screen w-1 bg-green-500"></div>
	<div class="pointer-events-none fixed left-0 top-0 h-1 w-screen bg-red-500"></div>
	<p use:draggable>diknvfeirpofgneoir</p>
</div>

<p>{$mouseStatus} {$canvasPosition}</p>

<style>
</style>
