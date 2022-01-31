<script type="text/javascript">
	import { goto } from '$app/navigation';
	let raceId = null;
	function handleSubmit() {
		if (raceId != null) {
			goto(`Sampling-Distribution-of-the-Sample-Proportion/${raceId}`);
		}
	}
</script>

<svelte:head>
	<title>Sampling Distribution of the Sample Proportion Visualizer</title>
</svelte:head>

<h1>Sampling Distribution of the Sample Proportion Visualizer</h1>

<form on:submit|preventDefault="{handleSubmit}">
	<label>Enter race_id of race dataset from http://onlineraceresults.com/</label>
	<input type="number" bind:value="{raceId}" />
</form>
