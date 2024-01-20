<script lang="ts">
	import {
		canvasPosition,
		mouseLeft,
		mouseRight,
		cursorCanvas,
		cursorScreen,
		tool,
		settings
	} from '$lib';
	import Box from '$lib/components/Box.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import Properties from '$lib/components/Properties.svelte';
	import { elements, selected, type Elements, type RectElement } from '$lib/elements';
	import { draggable } from '@neodrag/svelte';
	import { writable, type Writable } from 'svelte/store';

	let clickPos: [number, number] = [0, 0]; // initial click position
	let dragPos: [number, number] = [0, 0]; // held mouse position
	$: dragDelta = [dragPos[0] - clickPos[0], dragPos[1] - clickPos[1]];
	let addedElement: Writable<Elements> | null = null;

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
			} else if ($tool === 'rectangle' && addedElement !== null) {
				$addedElement.size[0] = Math.abs(dragDelta[0]);
				$addedElement.size[1] = Math.abs(dragDelta[1]);
				$addedElement.position = $cursorCanvas;
			}
			dragPos = [e.clientX, e.clientY];
		}
	}

	function click(e: MouseEvent) {
		e.stopPropagation();
		clickPos = [e.clientX, e.clientY];
		dragPos = [e.clientX, e.clientY];
		$selected = null;
		$mouseLeft = 'down';
		if ($tool === 'rectangle') {
			addRect();
		}
	}

	function release(e: MouseEvent) {
		e.stopPropagation();
		$selected = addedElement; // select the new element
		addedElement = null; // remove the newly added element
		$mouseLeft = 'up';
	}

	function addRect() {
		const element = writable<RectElement>({
			type: 'rect',
			name: 'Rectangle',
			position: $cursorCanvas,
			size: [0, 0],
			roundness: [0, 0, 0, 0],
			rotation: 0
		});
		addedElement = element;
		$elements.push(element);
		$elements = $elements;
		console.log($elements);
	}
</script>

<svelte:body />

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

<div
	class="fixed h-screen w-screen"
	on:mousedown={click}
	on:mouseup={release}
	on:mousemove={handleCursor}
	role="none"
>
	<div
		class="canvas fixed left-0 top-0 h-0 w-0"
		style="translate: {$canvasPosition[0]}px {$canvasPosition[1]}px;"
	>
		{#each $elements as e}
			<Box {e} />
		{/each}
	</div>
</div>

{#if true}
	<div
		class="pointer-events-none fixed left-0 top-0"
		style="translate: {$cursorScreen[0]}px {$cursorScreen[1]}px;"
	>
		<p>{$tool} {$mouseLeft}</p>
		<p>screen: {$cursorScreen}</p>
		<p>drag: {dragDelta}</p>
		<p>click: {clickPos}</p>
		<p>canvas: {$cursorCanvas}</p>
	</div>
{/if}

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

<div class="fixed left-0 top-0">
	<Panel>
		<select class="text-black" bind:value={$tool}>
			<option value="none">none</option>
			<option value="pan">pan</option>
			<option value="select">select</option>
			<option value="text">Text</option>
			<option value="rectangle">Rectangle</option>
			<option value="ellipse">Ellipse</option>
		</select>
	</Panel>
</div>

<div class="fixed right-0 top-0">
	<Panel>
		{#if $selected}
			<Properties element={$selected} />
		{:else}
			no element selected
		{/if}
	</Panel>
</div>

<div class="fixed bottom-0">
	<Panel>bottomleft</Panel>
</div>

<div class="fixed bottom-0 right-0">
	<Panel>
		<button on:click={addRect}></button>
	</Panel>
</div>

<style>
</style>
