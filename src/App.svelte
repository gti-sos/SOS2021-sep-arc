<script lang="ts">
	import Router from "svelte-spa-router";
	import NotFound from "./NotFound.svelte";
	import Info from "./Info.svelte";
	import Home from "./Home.svelte";
	import schizophrenia_stats from "./front/schizophrenia_stats_API/Schizophrenia.svelte";
	import edit_schizophrenia_stats from "./front/schizophrenia_stats_API/SchizophreniaEdit.svelte";
	const routes = {
		"/": Home,
		"/info": Info,
		"/schizophrenia-stats": schizophrenia_stats,
		"/schizophrenia-stats/:country/:year": edit_schizophrenia_stats,
		"*": NotFound,
	};
</script>

<main>
	<h1>sos2021-sep-arc</h1>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #900c3f;
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
