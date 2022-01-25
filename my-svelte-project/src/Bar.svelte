<script>
	import { onMount } from "svelte";
	export let label = "";
	export let height = 10;
	export let width = 20;
	let color;
	onMount(() => {
		color = Math.floor(Math.random()*16777215).toString(16);
	});
</script>

<div class="bar" style="--width: {width}%;--height: {height}%;--color: #{color};">
	<p class="text">{label}</p>
</div>

<style>
	.bar {
		width: var(--width);
		height: var(--height);
		background: var(--color);
		display: flex;
		align-items: flex-end;
	}
	.text {
		max-width: 100%;
		overflow-wrap: break-word;
		margin: 0px;
	}
</style>
