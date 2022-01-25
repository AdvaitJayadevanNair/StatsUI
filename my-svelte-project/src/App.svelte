<script>
	import Chart from "./Chart.svelte";
	import { getSample } from "./data.js";
	let slider = 1;
	let bars = [];
	$: {
		bars = [];
		for (let i = 0; i < slider; i++) {
			bars.push({
				label: i,
				percent: i*5,
			});
		}
	}
</script>

<Chart bars={bars}/>
<input type="range" min="1" max="20" bind:value={slider}>
<p>n={slider}</p>


<style>
	:global(body){
		padding: 0;
 		width: 100%;
		height: 100%; 
	}
</style>