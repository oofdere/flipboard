<script lang="ts">
	import { tool } from '$lib';
	import TablerTrianglePlus2 from '~icons/tabler/triangle-plus-2';
	import TablerCirclePlus2 from '~icons/tabler/circle-plus-2';
	import TablerSquarePlus2 from '~icons/tabler/square-plus-2';
	import TablerZoomPan from '~icons/tabler/zoom-pan';
	import GisCoordSystem from '~icons/gis/coord-system';
	import FluentSelectObject24Regular from '~icons/fluent/select-object-24-regular';
	import FluentText12Regular from '~icons/fluent/text-12-regular';
	import Tool from './Tool.svelte';
</script>

<ul class="flex h-full flex-col text-xl">
	<div>
		<Tool id="pan" kbd="a">
			<TablerZoomPan class="p-2" />
		</Tool>
		<Tool id="select" kbd="s">
			<FluentSelectObject24Regular class="p-2" />
		</Tool>
		<Tool id="text" kbd="t">
			<FluentText12Regular class="p-2" />
		</Tool>
		<Tool id="rectangle" kbd="r">
			<TablerSquarePlus2 class="p-2" />
		</Tool>
		<Tool id="ellipse" kbd="c">
			<TablerCirclePlus2 class="p-2" />
		</Tool>
		<Tool id="triangle" kbd="y">
			<TablerTrianglePlus2 class="p-2" />
		</Tool>
	</div>
	<div></div>
</ul>
