<script>
	import Bar from "./Bar.svelte";
	export let bars = [];

</script>
<div class="chart">
	{#each bars as bar}
		<Bar label={bar.label} height={bar.percent} width={100/bars.length} />
	{/each}
</div>
<style>
	.chart {
		width: calc(100% - 100px);
		height: 100%;
		background: black;
		display: flex;
		align-items: flex-end;
	}
	
</style>
