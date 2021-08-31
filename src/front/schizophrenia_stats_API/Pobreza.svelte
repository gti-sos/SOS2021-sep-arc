<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_POBREZA =
        "https://disease.sh/v2/countries?yesterday=false&sort=deaths&allowNull=true";
    //INTEGRACION API EXTERNA
    async function loadPobreza() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_POBREZA).then(function (res) {
            if (res.ok) {
                errorMsg = "";
                console.log("OK");
            } else {
                if (res.status === 500) {
                    errorMsg = "No se ha podido acceder a la base de datos";
                }
                console.log("ERROR!" + errorMsg);
            }
        });
    }

    async function getDatos() {
        console.log("Fetching data...");
        await loadPobreza();
        const res = await fetch(BASE_API_POBREZA);
        if (res.ok) {
            const json = await res.json();
            datos = json;
            console.log(`We have received ${datos.length} stats.`);
            console.log("Ok");
        } else {
            errorMsg = "Error recuperando datos";
            console.log("ERROR!" + errorMsg);
        }
    }
    async function loadChart() {
        await getDatos();
        var casosPorPersona = [];
        var muertesPorPersona = [];
        var testPorPersona = [];
        
        datos.forEach((dato_pobreza) => {
            casosPorPersona.push(dato_pobreza.oneCasePerPeople);
            muertesPorPersona.push(dato_pobreza.oneDeathPerPeople);
            testPorPersona.push(dato_pobreza.oneTestPerPeople);
            
        });

        // Build the chart
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Datos de probreza'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'oneCasePerPeople',
            y: parseInt(casosPorPersona)
        }, {
            name: 'oneDeathPerPeople',
            y: parseInt(muertesPorPersona)
        }, {
            name: 'oneTestPerPeople',
            y: parseInt(testPorPersona)
        }]
    }]
});
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadChart}></script>
</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description" />
    </figure>
    {#if errorMsg}
        <p>{errorMsg}</p>
    {/if}

    <br />
    <Nav>
        <NavItem>
            <NavLink href="/">Página Principal</NavLink>
        </NavItem>
    </Nav>
</main>

<style>
   .highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 660px;
    margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

</style>
