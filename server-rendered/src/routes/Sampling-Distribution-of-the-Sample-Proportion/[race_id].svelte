<svelte:head>
	<title>Sampling Distribution of the Sample Proportion Visualizer</title>
</svelte:head>

<script context="module">
	import axios from 'axios';
	export async function load({ params, fetch, session, stuff }) {
		const url = `http://onlineraceresults.com/race/view_race.php?race_id=${params.race_id}&submit_action=select_result&order_by=default&group_by=default#results`;//
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					article: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
		// try {
		// 	const { data } = await axios.get(url);
		// 	console.log(url);
		// 	return {
		// 	  	props: {
		// 	  		article: 'ss'
		// 	  	}
		// 	};
		// } catch (error) {
		// 	console.log(error);
		//   	if (axios.isAxiosError(error)) {
		// 		console.log(error);
		//   	} else {
		//     	console.log(error);
		//   	}
		// 	return {
		// 		// status: res.status,
		// 		error: new Error(`Could not load ${url}`)
		// 	};
		// }
	}
</script>

<script>
	import Chart from './Chart.svelte';
	import { getSample } from './stats.js';
	let n = 1;
	let bars = [];
	let a = 1;
	let mean = 0;
	let show = true;
	let dupicates = false;
	let label = true;
	let format = false;

	function work2(a, n, dupicates) {
		mean = 0;
		let temp = {};
		for(let i = 0; i <= n; i++){
			temp[i/n] = 0;
		}
		for (let i = 0; i < a; i++) {
			let val = getSample(n, dupicates);
			temp[val]++;
			mean += val;
		}
		mean = mean / a;
		let temp2 = [];
		for (const [key, value] of Object.entries(temp)) {
			temp2.push({
				label: key,
				percent: value,
			});
		}
		let max = 0;
		temp2.sort((f, s) => {
			if (f.percent > max) max = f.percent;
			if (s.percent > max) max = s.percent;
			if (f.label < s.label) {
				return -1;
			}
			if (f.label > s.label) {
				return 1;
			}
		});
		for (let i = 0; i < temp2.length; i++) {
			temp2[i].label = Math.round(temp2[i].label * 1000) / 1000;
			temp2[i].percent = (temp2[i].percent / max) * 95;
		}
		return temp2;
	}

	function work(a, n, dupicates) {
		mean = 0;
		let temp = {};
		for (let i = 0; i < a; i++) {
			let val = getSample(n, dupicates);
			if (temp[val]) {
				temp[val]++;
			} else{
				temp[val] = 1;
			}
			mean += val;
		}
		mean = mean / a;
		let temp2 = [];
		for (const [key, value] of Object.entries(temp)) {
			temp2.push({
				label: key,
				percent: value,
			});
		}
		let max = 0;
		temp2.sort((f, s) => {
			if (f.percent > max) max = f.percent;
			if (s.percent > max) max = s.percent;
			if (f.label < s.label) {
				return -1;
			}
			if (f.label > s.label) {
				return 1;
			}
		});
		for (let i = 0; i < temp2.length; i++) {
			temp2[i].label = Math.round(temp2[i].label * 1000) / 1000;
			temp2[i].percent = (temp2[i].percent / max) * 95;
		}
		return temp2;
	}

	$: bars = format ? work2(a, n, dupicates) : work(a, n, dupicates);
</script>

<Chart bars="{bars}" {label}/>
<div class="overlay">
	{#if show}
	<p>n:</p>
	<input type="range" min="1" max="100" bind:value="{n}" />
	<input type="number" min="1" bind:value="{n}" />
	<p>a:</p>
	<input type="range" min="1" max="10000" bind:value="{a}" />
	<input type="number" min="1" bind:value="{a}" />
	<p>mean: {Math.round(mean * 1000) / 1000}</p>
	<p>
		No duplicates in sample(Makes it slower!):
		<input type=checkbox bind:checked={dupicates}>
	</p>
	<p>
		Show label:
		<input type=checkbox bind:checked={label}>
	</p>
	<p>
		Show with constant intervals:
		<input type=checkbox bind:checked={format}>
	</p>
	<button on:click={() => show = false}>Close</button>
	{:else} 
	<button on:click={() => show = true}>Open</button>
	{/if}
</div>

<style>
	:global(html, body) {
		width: 100%;
		height: 100%;
	}
	:global(*) {
		padding: 0 !important;
		margin: 0  !important;
		box-sizing: border-box  !important;
	}
	.overlay {
		width: 200px;
		position: fixed;
		top: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.45);
	}
</style>
