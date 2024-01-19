<script lang="ts">
	import { canvasPosition, mouseLeft, mouseRight, cursorCanvas, cursorScreen, tool } from '$lib';
	import Panel from '$lib/components/Panel.svelte';
	import { draggable } from '@neodrag/svelte';

	let clickPos: [number, number] = [0, 0]; // initial click position
	let dragPos: [number, number] = [0, 0]; // held mouse position

	function handleCursor(e: MouseEvent) {
		e.stopPropagation();
		$cursorScreen = [e.clientX, e.clientY];
		if ($mouseLeft === 'down') {
			if ($tool === 'pan') {
				$canvasPosition[0] += $cursorScreen[0] - dragPos[0];
				$canvasPosition[1] += $cursorScreen[1] - dragPos[1];
			} else if ($tool === 'select') {
				dragPos[0] += e.clientX - clickPos[0];
				dragPos[1] += e.clientY - clickPos[1];
			}

			dragPos = [e.clientX, e.clientY];
		}
	}

	function click(e: MouseEvent) {
		e.stopPropagation();
		clickPos = [e.clientX, e.clientY];
		dragPos = [e.clientX, e.clientY];
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
></div>

<!-- X-axis marker-->
<div
	class="pointer-events-none fixed left-0 top-0 h-[1px] w-screen bg-red-500"
	style="top: {$canvasPosition[1] - 0.5}px;"
></div>

<!-- Y-axis marker -->
<div
	class="pointer-events-none fixed left-0 top-0 h-screen w-[1px] bg-green-500"
	style="left: {$canvasPosition[0] - 0.5}px;"
></div>

{#if $tool === 'select'}
	<div
		class="pointer-events-none fixed top-0 border-4 border-dashed border-blue-600 bg-blue-400 opacity-35"
		style="translate: 
		{dragPos[0] - clickPos[0] > 0 ? clickPos[0] : dragPos[0]}px 
		{dragPos[1] - clickPos[1] > 0 ? clickPos[1] : dragPos[1]}px; 
		width: {Math.abs(dragPos[0] - clickPos[0])}px; 
		height: {Math.abs(dragPos[1] - clickPos[1])}px;"
	>
		<div class="fixed">
			translate:
			{dragPos[0] - clickPos[0] > 0 ? clickPos[0] : dragPos[0]}px
			{dragPos[1] - clickPos[1] > 0 ? clickPos[1] : dragPos[1]}px; width: abs({dragPos[0] -
				clickPos[0]}px); height: abs({dragPos[1] - clickPos[1]}px);
		</div>
	</div>
{/if}

<p>{$mouseLeft} {$canvasPosition}</p>

<div class="fixed left-0 top-0" style="translate: {$cursorScreen[0]}px {$cursorScreen[1]}px;">
	<p>{$tool} {$mouseLeft}</p>
	<p>screen: {$cursorScreen}</p>
	<p>drag: {dragPos}</p>
	<p>click: {clickPos}</p>
	<p>canvas: {$cursorCanvas}</p>
</div>

<div class="fixed left-0 top-0">
	<Panel>
		<select class="text-black" bind:value={$tool}>
			<option value="pan">pan</option>
			<option value="select">select</option>
			<option value="text">Text</option>
			<option value="rectangle">Rectangle</option>
			<option value="ellipse">Ellipse</option>
		</select>
	</Panel>
</div>

<div class="fixed right-0 top-0">
	<Panel>topright</Panel>
</div>

<div class="fixed bottom-0">
	<Panel>bottomleft</Panel>
</div>

<div class="fixed bottom-0 right-0">
	<Panel>bottomright</Panel>
</div>

<style>
</style>
