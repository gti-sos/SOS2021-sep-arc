<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_CHILDREN = "https://sos2021-24.herokuapp.com/api/v2/children-employment"
    //INTEGRACION API INTERNA
    async function loadChildren() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_CHILDREN).then(
          function (res) {
            if (res.ok) {
              errorMsg = "";
              console.log("OK");
            } else {
              if (res.status === 500) {
                errorMsg = "No se ha podido acceder a la base de datos";
              }
              console.log("ERROR!" + errorMsg);
            }
          }
        );
      }
    
      async function getDatos() {
        console.log("Fetching data...");
        await loadChildren();
        const res = await fetch(BASE_API_CHILDREN);
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
      async function loadChart(){
        await getDatos();
        var m = [];
        var f = [] ;
        var t = [] ;
        datos.forEach((dato_desempleo) => {
            m.push(dato_desempleo.percent_children_employment_m);
            f.push(dato_desempleo.percent_children_employment_f);
            t.push(dato_desempleo.percent_children_employment_t);
        });
        
        Highcharts.chart('container', {
    chart: {
        type: 'columnrange',
        inverted: true
    },
    title: {
    },
    xAxis: {
        categories: t,
    },
    yAxis: {
        title: {
            text: 'Porcentaje'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        columnrange: {
            dataLabels: {
                enabled: true,
                format: '{y}%'
            }
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Porcentaje masculino',
        data: m   
    }, {
        name: 'Porcentaje femenino',
        data: f
    }]
});
}
</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}></script>
</svelte:head>

<main> 
     

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
    </p>
</figure>


{#if errorMsg}
<p>{errorMsg}</p>
{/if}
<br/>
<Nav>
    <NavItem>
    <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    
</Nav>
</main>


<style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    
.highcharts-figure, .highcharts-data-table table {
  min-width: 320px; 
  max-width: 800px;
  margin: 1em auto;
}
#container {
  height: 400px;
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