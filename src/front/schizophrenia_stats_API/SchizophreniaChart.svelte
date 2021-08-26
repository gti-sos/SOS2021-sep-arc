<script>
    import{Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_SCHIZOPHRENIA_API_PATH = "/api/v2";
    let schizophreniaData=[];
    let schizophreniaChartCountry = [];
    let schizophreniaChartMen = [];
    let schizophreniaChartWomen = [];
    let schizophreniaChartPopulation = [];
    let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
    let cargados = false;
    async function loadChart() {
        console.log("Fetching data...");
        const res = await fetch(BASE_SCHIZOPHRENIA_API_PATH + "/schizophrenia-stats");
        schizophreniaData = await res.json();
        if (res.ok) {
            schizophreniaData.forEach(stat => {
            schizophreniaChartCountry.push(stat.country);
            schizophreniaChartMen.push(stat["schizophrenia_men"]);
            schizophreniaChartWomen.push(stat["schizophrenia_women"]);
            schizophreniaChartPopulation.push(stat["schizophrenia_population"]);  
            });
            cargados=true;
        }      
            
        Highcharts.chart('container', {
            title: {
                text: 'Schizophrenia-stats'
            },
            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
            xAxis: {
                categories: schizophreniaChartCountry,
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
         
        
            series: [{
                name: 'Índice de esquizofrenia por hombre',
                data: schizophreniaChartMen,
            }, {
                name: 'Índice de esquizofrenia por mujer',
                data: schizophreniaChartWomen,
            }, {
                name: 'Índice de esquizofrenia en población',
                data: schizophreniaChartPopulation,
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadChart}></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
          <NavLink href="#/schizophrenia-stats">Cargar datos</NavLink>
        </NavItem>
    </Nav>

    <div>
        <h2>
          API schizophrenia
        </h2>
      </div>

    <div>
        <figure class="highcharts-figure">
          <div id="container" />
        </figure>
    </div>

    <div>
      {#if !cargados}
        <p class="error">{errorMsg}</p>
      {/if}
    </div>

    <Nav>
        <NavItem>
          <NavLink href="/">Volver</NavLink>
        </NavItem>
    </Nav>
</main>

<style>
    main {
        text-align: center;
        padding: 30px;       
    }
    p.error{
      color: red; 
      text-align:center;
      font-size: 20px;
      margin-top:80px;
    }
    
    .highcharts-figure,
    .highcharts-data-table table {
    /*min-width: 360px;
    max-width: 800px;*/
    margin: 1em auto;
     }
  .highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
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
  .highcharts-data-table td,
  .highcharts-data-table th,
  .highcharts-data-table caption {
    padding: 0.5em;
  }
  .highcharts-data-table thead tr,
  .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
  }
  .highcharts-data-table tr:hover {
    background: #3d4044;
  }
  
</style>