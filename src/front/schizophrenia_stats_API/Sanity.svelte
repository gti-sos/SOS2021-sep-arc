<script>
    import { select_multiple_value } from "svelte/internal";
      var miAPI = "https://sos2021-10.herokuapp.com/api/v2/sanity-stats/?year=2008";
      var API2 = "https://sos2021-sep-arc.herokuapp.com/api/v2/schizophrenia-stats/?year=2008";
      async function loadGraph(){
          let dataG2 = [];
          let myData = [];
                 
          const resDataG2 = await fetch(API2);
          const resData = await fetch(miAPI);
          myData = await resData.json();
          dataG2 = await resDataG2.json();
          let array1 = [];
          let array2 =[];
          let sum = [];
          let sum2 = []
          dataG2.forEach(( x) =>{
         sum +=parseFloat(x.schizophrenia_population)
         console.log(dataG2)
         console.log((x.health_expenditure_in_percentage))
         
          });
          array1.push({x:"2008".toString(), y:parseFloat(sum) })
         
          
      myData.forEach(( x) =>{
        sum2 +=parseFloat(x.health_expenditure_in_percentage)
         console.log(myData)
        });
        
        array2.push({x:"2008".toString(), y:parseInt(sum2)})
        console.log(array1)
        console.log(array2)
        
          console.log("OK, BIEN")
          var chart = JSC.chart('chartDiv', { 
      debug: true, 
      type: 'horizontal column', 
      palette: 'fiveColor7', 
      yAxis: { 
        scale_type: 'stacked', 
        label_text: 'porcentaje'
      }, 
      defaultPoint_outline_color: 'darkenMore', 
      title_label_text: 'Acme Tool Sales', 
      xAxis_label_text: 'Año', 
      series: [ 
        { 
          name: 'Schizophrenia', 
          id: 's1', 
          points: 
            array1
          
        }, 
        { 
          name: 'Sanity', 
          points: array2
        } 
      ] 
    }); 
    }
    </script>
    
    <svelte:head>
    
    <script
    type="text/javascript" src="https://code.jscharting.com/latest/jscharting.js"
        on:load={loadGraph}></script>
    </svelte:head>
    
    <main>
    
    <div id="chartDiv"></div>
    
    </main>