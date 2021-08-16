<script lang="ts">
	import NotFound from "./NotFound.svelte";
	import Home from "./Home.svelte";
	import schizophrenia_stats from "./schizophrenia_stats_API/App.svelte";
	const routes = {
		"/": Home,
		"/schizophrenia_stats": schizophrenia_stats,
		"*": NotFound,
	};
</script>
	<main>
		<h1>sos2021-sep-arc</h1>
	</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>