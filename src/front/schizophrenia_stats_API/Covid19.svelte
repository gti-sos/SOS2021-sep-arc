<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  var errorMsg = "";
  var datos = [];
  const BASE_API_COVID = "https://disease.sh/v3/covid-19/states";
  //INTEGRACION API EXTERNA
  async function loadCovid() {
    console.log("Loading data...");
    const res = await fetch(BASE_API_COVID).then(function (res) {
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
    await loadCovid();
    const res = await fetch(BASE_API_COVID);
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
    var casos = [];
    var muertes = [];
    var population = [];
    datos.forEach((dato_covid) => {
      casos.push(dato_covid.cases);
      muertes.push(dato_covid.deaths);
      population.push(dato_covid.population);
    });

    Highcharts.chart("container", {
      chart: {
        type: "spline",
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1,
        },
      },
      title: {
        text: "Datos de Covid19 por la Universidad de Johns Hopkins",
        align: "left",
      },

      xAxis: {
        type: "datetime",
        labels: {
          overflow: "justify",
        },
      },
      yAxis: {
        title: {
          text: "",
        },
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
        plotBands: [
          {
            // Light air
            from: 0.3,
            to: 1.5,
            color: "rgba(68, 170, 213, 0.1)",
            label: {
              text: "Light air",
              style: {
                color: "#606060",
              },
            },
          },
          {
            // Light breeze
            from: 1.5,
            to: 3.3,
            color: "rgba(0, 0, 0, 0)",
            label: {
              text: "Light breeze",
              style: {
                color: "#606060",
              },
            },
          },
          {
            // Gentle breeze
            from: 3.3,
            to: 5.5,
            color: "rgba(68, 170, 213, 0.1)",
            label: {
              text: "Gentle breeze",
              style: {
                color: "#606060",
              },
            },
          },
          {
            // Moderate breeze
            from: 5.5,
            to: 8,
            color: "rgba(0, 0, 0, 0)",
            label: {
              text: "Moderate breeze",
              style: {
                color: "#606060",
              },
            },
          },
          {
            // Fresh breeze
            from: 8,
            to: 11,
            color: "rgba(68, 170, 213, 0.1)",
            label: {
              text: "Fresh breeze",
              style: {
                color: "#606060",
              },
            },
          },
          {
            // Strong breeze
            from: 11,
            to: 14,
            color: "rgba(0, 0, 0, 0)",
            label: {
              text: "Strong breeze",
              style: {
                color: "#606060",
              },
            },
          },
          {
            // High wind
            from: 14,
            to: 15,
            color: "rgba(68, 170, 213, 0.1)",
            label: {
              text: "High wind",
              style: {
                color: "#606060",
              },
            },
          },
        ],
      },
      tooltip: {
        valueSuffix: "",
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          states: {
            hover: {
              lineWidth: 5,
            },
          },
          marker: {
            enabled: false,
          },
          pointInterval: 3600000, // one hour
          pointStart: Date.UTC(2018, 1, 13, 0, 0, 0),
        },
      },
      series: [
        {
          name: "Casos confirmados",
          data: casos,
        },
        {
          name: "Muertes",
          data: muertes,
        },
      ],
      navigation: {
        menuItemStyle: {
          fontSize: "10px",
        },
      },
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
  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
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
    background: #f1f7ff;
  }
</style>
