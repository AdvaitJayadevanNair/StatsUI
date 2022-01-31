<script>
	import { onMount } from "svelte";
	export let label = "";
	export let height = 10;
	export let width = 20;
	export let showLabel = true;
	let color;
	onMount(() => {
		color = Math.floor(Math.random()*16777215).toString(16);
	});
</script>
<div class="warpper" style="--width: {width}%;--height: {height}%;--color: #{color};">
	<div class="bar" >
		{#if showLabel}
		<p class="text">{label}</p>
		{/if}
	</div>
</div>

<style>
	.warpper {
		width: var(--width);
		height: 100%;
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-end;
	}
	.bar {
		width: 100%;
		height: var(--height);
		background: var(--color);
		display: flex;
		align-items: flex-end;
		border: 1px solid whitesmoke;
	}
	.text {
		color: white;
		max-width: 100%;
		overflow-wrap: break-word;
		margin: 0px;
		mix-blend-mode: difference;
	}
</style>
