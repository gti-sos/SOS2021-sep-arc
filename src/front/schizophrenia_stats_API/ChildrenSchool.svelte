<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_CHILDREN__OUT_CHILDREN = "https://sos2021-24.herokuapp.com/api/v2/children-out-school"
    //INTEGRACION API INTERNA
    async function loadChildren() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_CHILDREN__OUT_CHILDREN).then(
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
        const res = await fetch(BASE_API_CHILDREN__OUT_CHILDREN);
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
        var male = [];
        var female = [] ;
        var total = [] ;
        datos.forEach((dato_childrenSchool) => {
            male.push(dato_childrenSchool.children_out_school_male);
            female.push(dato_childrenSchool.children_out_school_female);
            total.push(dato_childrenSchool.children_out_school_total);
        });
        console.log("BIEN")
        console.log(male)
        console.log(female)
        console.log(total)
        
        Highcharts.chart('container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Children out school'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value} children_out_school'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name: 'children_out_school_male',
        data: male
        
    }, {
        name: 'children_out_school_female',
        data:  female
        
    }, {
        name: 'children_out_school_total',
        data:  total
        
    }]
});

}
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
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