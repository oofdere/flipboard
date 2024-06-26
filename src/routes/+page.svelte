<script lang="ts">
	import {
		canvasPosition,
		mouseLeft,
		mouseRight,
		cursorCanvas,
		cursorScreen,
		tool,
		settings,
		zoom,
		zoomRatio,
		modifier
	} from '$lib';
	import Box from '$lib/components/Box.svelte';
	import LeftPane from '$lib/components/LeftPane.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import Properties from '$lib/components/Properties.svelte';
	import ThemeSelector from '$lib/components/ThemeSelector.svelte';
	import Tools from '$lib/components/Tools.svelte';
	import {
		elements,
		selected,
		type Elements,
		type RectElement,
		type EllipseElement,
		type TextElement,
		serialize
	} from '$lib/elements';
	import { draggable } from '@neodrag/svelte';
	import { writable, type Writable } from 'svelte/store';

	let clickPos: [number, number] = [0, 0]; // initial click position
	let dragPos: [number, number] = [0, 0]; // held mouse position
	$: dragDelta = [(dragPos[0] - clickPos[0]) / $zoomRatio, (dragPos[1] - clickPos[1]) / $zoomRatio];
	let addedElement: Writable<Elements> | null = null;

	function handleCursor(e: MouseEvent) {
		e.stopPropagation();
		$cursorScreen = [e.pageX, e.pageY];
		if ($mouseLeft === 'down') {
			if ($tool === 'pan') {
				$canvasPosition[0] += $cursorScreen[0] - dragPos[0];
				$canvasPosition[1] += $cursorScreen[1] - dragPos[1];
			} else if ($tool === 'select') {
			} else if ($tool === 'text') {
			} else if (addedElement !== null) {
				$addedElement.size[0] = Math.abs(dragDelta[0]);
				$addedElement.size[1] = Math.abs(dragDelta[1]);
				/*$addedElement.position = [
					dragDelta[0] < 0 ? $cursorCanvas[0] : clickPos[0],
					dragDelta[1] < 0 ? $cursorCanvas[1] : clickPos[1]
				];*/
			}
			dragPos = [e.pageX, e.pageY];
		}
	}

	function click(e: MouseEvent) {
		e.stopPropagation();
		clickPos = [e.pageX, e.pageY];
		dragPos = [e.pageX, e.pageY];
		$selected = null;
		$modifier = null;
		$mouseLeft = 'down';
		switch ($tool) {
			case 'rectangle':
				addRect();
				break;
			case 'ellipse':
				addEllipse();
				break;
			case 'text':
				addText();
				break;
			default:
				break;
		}
	}

	function release(e: MouseEvent) {
		e.stopPropagation();
		$selected = addedElement; // select the new element
		addedElement = null; // remove the newly added element
		$mouseLeft = 'up';
		$tool = 'pan';
	}

	function addRect() {
		const element = writable<RectElement>({
			type: 'rect',
			name: 'Rectangle',
			position: $cursorCanvas,
			size: [0, 0],
			roundness: ['0', '0', '0', '0'],
			rotation: 0,
			fill: '#eeeeee',
			outline: [2, '#000000'],
			lockedRatio: false,
			blendMode: 'normal',
			opacity: 100,
			hidden: false
		});
		addedElement = element;
		$elements.push(element);
		$elements = $elements;
		console.log(serialize(elements));
	}

	function addEllipse() {
		const element = writable<EllipseElement>({
			type: 'ellipse',
			name: 'Ellipse',
			position: $cursorCanvas,
			size: [0, 0],
			rotation: 0,
			fill: '#eeeeee',
			outline: [2, '#000000'],
			lockedRatio: false,
			blendMode: 'normal',
			opacity: 100,
			hidden: false
		});
		addedElement = element;
		$elements.push(element);
		$elements = $elements;
		console.log(serialize(elements));
	}

	function addText() {
		const element = writable<TextElement>({
			type: 'text',
			name: 'Text',
			text: 'Sample Text',
			position: $cursorCanvas,
			rotation: 0,
			fill: '#eeeeee',
			outline: [1, '#000000'],
			lockedRatio: false,
			blendMode: 'normal',
			opacity: 100,
			hidden: false,
			size: 48
		});
		addedElement = element;
		$elements.push(element);
		$elements = $elements;
		console.log(serialize(elements));
	}
</script>

<svelte:window
	on:keyup={(e) => {
		if ($selected) {
			switch (e.key) {
				case 'r':
					$modifier = 'rotate';
					break;
				case 's':
					$modifier = 'scale';

					break;
				default:
					break;
			}
		}
	}}
/>

<!-- X-axis marker-->
<div
	class="pointer-events-none fixed left-0 top-0 h-[1px] w-screen bg-primary"
	style="top: {$canvasPosition[1] - 0.5}px;"
></div>

<!-- Y-axis marker -->
<div
	class="pointer-events-none fixed left-0 top-0 h-screen w-[1px] bg-secondary"
	style="left: {$canvasPosition[0] - 0.5}px;"
></div>

<div
	class="fixed h-screen w-screen {$tool === 'text'
		? 'cursor-text'
		: $tool === 'pan'
			? $mouseLeft === 'down'
				? 'cursor-grabbing'
				: 'cursor-grab'
			: 'cursor-crosshair'}"
	on:mousedown={click}
	on:mouseup={release}
	on:mousemove={handleCursor}
	on:wheel={(e) => {
		const z = $zoom + (e.deltaY / -100) * $settings.zoomMultiplier;
		$zoom = z > 0 ? z : $zoom;
	}}
	role="none"
>
	<div
		class="canvas fixed left-0 top-0 h-0 w-0"
		style="translate: {$canvasPosition[0]}px {$canvasPosition[1]}px; scale: {$zoom}%;"
	>
		{#each $elements as e}
			<Box {e} />
		{/each}
	</div>
</div>

{#if true}
	<div
		class="pointer-events-none fixed left-0 top-0"
		style="translate: {$cursorScreen[0]}px {$cursorScreen[1]}px; "
	>
		{#if !$modifier}
			<p>{$tool} {$mouseLeft}</p>
			<p>screen: {$cursorScreen[0]}</p>
			<p>drag: {dragDelta}</p>
			<p>click: {clickPos}</p>
			<p>canvas: {$cursorCanvas}</p>
		{/if}
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

<div class="fixed left-0 top-0 h-screen resize-x">
	<Panel>
		<LeftPane></LeftPane>
	</Panel>
</div>

<div class="fixed right-0 top-0 h-screen w-64">
	<Panel>
		{#if $selected}
			<Properties element={$selected} />
		{:else}
			no element selected
		{/if}
	</Panel>
</div>

<div class="pointer-events-none fixed bottom-0 right-0 p-2 text-right">
	<p>Dingma(R) Balls(TM) Milestone 1 {$modifier}</p>
	<!-- svelte-ignore missing-declaration -->
	<p>For testing purposes only. Build {BUILD_TIMESTAMP}</p>
</div>

<style>
</style>
