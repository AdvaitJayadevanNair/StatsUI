<script>
	import Bar from "./Bar.svelte";
	export let bars = [];
	export let label = true;

</script>
<div class="chart">
	{#each bars as bar}
		<Bar showLabel={label} label={bar.label} height={bar.percent} width={100/bars.length} />
	{/each}
</div>
<style>
	.chart {
		width: 100%;
		height: 100%;
		background: black;
		display: flex;
		align-items: flex-end;
	}
	
</style>
