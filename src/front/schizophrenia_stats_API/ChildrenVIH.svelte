<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_VIH = "https://sos2021-24.herokuapp.com/api/v2/children-with-hiv"
    
    async function loadVIH() {
        console.log("Loading data...");
      
        const res = await fetch(BASE_API_VIH).then(
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
      
      async function getdatos() {
        console.log("Fetching data...");
        await loadVIH();
        const res = await fetch(BASE_API_VIH);
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
        await getdatos();
        var living = [];
        var newly = [] ;
		var total = [] ;
       
        datos.forEach((dato_api) => {
            living.push(parseFloat(dato_api.living_with));
            newly.push(parseFloat(dato_api.newly_infected));
			total.push(parseFloat(dato_api.total_infected));
           
    
        });
		
		
		Highcharts.chart('container', {
    chart: {
        type: 'area',
        inverted: true
    },
    title: {
        text: 'Children with VIH'
    },
    accessibility: {
        keyboardNavigation: {
            seriesNavigation: {
                mode: 'serialize'
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: living,
    },
    yAxis: {
        title: {
            text: 'Número de niños con VIH'
        },
        allowDecimals: false,
        min: 0
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
    },
	
	
	series: [{
        name: 'Recién infectados',
        data: newly
    }, {
        name: 'Total infectados',
        data: total
 
    
    
    }]
});
}
</script>
    
    <svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}>
</script>
 </svelte:head>
 
  <main>   
      <h3>Uso de la API Interna Children-VIH</h3>
      
    
      <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">    </p>
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
	  
	  #container {
    height: 410px; 
}
.highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 800px;
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