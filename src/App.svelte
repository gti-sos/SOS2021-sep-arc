<script lang="ts">
	import Router from "svelte-spa-router";
	import NotFound from "./NotFound.svelte";
	import Info from "./Info.svelte";
	import Home from "./Home.svelte";
	import Integrations from "./Integrations.svelte";
	import About from "./About.svelte";
	import schizophrenia_stats from "./front/schizophrenia_stats_API/Schizophrenia.svelte";
	import edit_schizophrenia_stats from "./front/schizophrenia_stats_API/SchizophreniaEdit.svelte";
	import schizoprenia_chart from "./front/schizophrenia_stats_API/SchizophreniaChart.svelte";
	
	import Employment from "./front/schizophrenia_stats_API/ChildrenEmployment.svelte"
	import ChildrenVIH from "./front/schizophrenia_stats_API/ChildrenVIH.svelte"
	
	import ChildrenSchool from "./front/schizophrenia_stats_API/ChildrenSchool.svelte"
	
	const routes = {
		"/": Home,
		"/info": Info,
		"/integrations": Integrations,
		"/about": About,
		"/integrations/employment": Employment,
		"/integrations/childrenVIH": ChildrenVIH,
		
		"/integrations/childrenSchool": ChildrenSchool,
		"/schizophrenia-stats": schizophrenia_stats,
		"/schizophrenia-stats/:country/:year": edit_schizophrenia_stats,
		"/analytics" :schizoprenia_chart,
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
