<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";
    
    const API_SCHIZOPHRENIA_STATS = "/api/v1/schizophrenia-stats"; //tiene que llamar a la API para tratar los datos
    let chargedData = false;
    let schizophreniaStats = [];
    let errorMsg = "";
    let correctMsg = "";
    let newData = {
        country: "",
        year: "",
        schizophrenia_men: "",
        schizophrenia_women: "",
        schizophrenia_population: "",
    };
    onMount(getschizophreniaStats);
    async function loadschizophreniaStats() {
        console.log("Loading data...");
        const res = await fetch(API_SCHIZOPHRENIA_STATS + "/loadInitialData");
        chargedData = true;
        if (res.ok) {
            console.log("Ok.");
            getschizophreniaStats();
            errorMsg = "";
            correctMsg = "Los datos se han cargado correctamente.";
        } else {
            console.log("Error loading data.");
        }
    }
    async function getschizophreniaStats() {
        console.log("Fetching schizophrenia stats...");
        const res = await fetch(API_SCHIZOPHRENIA_STATS);
        if (res.ok) {
            chargedData = true;
            console.log("Ok. Obtaining data...");
            const json = await res.json();
            schizophreniaStats = json;
            console.log(`Received ${schizophreniaStats.length} schizophrenia stats.`);
        } else if (res.status == 500) {
            errorMsg = "No se ha podido acceder la base de datos.";
            console.log(errorMsg);
        } else if (res.status == 404) {
            errorMsg = "No se encuentran datos. Tiene que cargarlos.";
            console.log("Error. " + errorMsg);
        } else {
            //este realmente no va a ser otro caso que el status = 500
            errorMsg = res.status + ": " + res.statusText;
            console.log(errorMsg);
        }
    }
    async function insertschizophreniaStats() {
        console.log("Inserting data" + JSON.stringify(newData) + "...");
        if (
            !newData.country ||
            !newData.year ||
            !newData["schizophrenia_men"] ||
            !newData["schizophrenia_women"] ||
            !newData["schizophrenia_population"]
        ) {
            alert("Todos los campos son obligatorios.");
        } else {
            const res = await fetch(API_SCHIZOPHRENIA_STATS, {
                method: "POST",
                body: JSON.stringify(newData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    console.log("OK");
                    getschizophreniaStats();
                    errorMsg = "";
                    correctMsg = "Se ha insertado correctamente.";
                } else if (res.status == 409) {
                    errorMsg = "Ya existe un recurso con el mismo país y año.";
                    console.log("ERROR. " + errorMsg);
                } else {
                    //status == 500
                    errorMsg = "No se ha podido acceder la base de datos.";
                    console.log("Error inserting data in DB");
                }
            });
        }
    }
    async function deleteschizophreniaStats() {
        console.log("Deleting schizophrenia stats...");
        chargedData = false;
        const res = await fetch(API_SCHIZOPHRENIA_STATS, {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("Ok. " + correctMsg);
                schizophreniaStats = [];
                errorMsg = "";
                correctMsg = "Se han eliminado todo los datos correctamente.";
            } else if (res.status == 404) {
                //no data found
                errorMsg = "No hay datos para borrar.";
                console.log("ERROR. " + errorMsg);
            } else {
                //status == 500
                errorMsg = "No se ha podido acceder a la base de datos.";
                console.log("ERROR. " + errorMsg);
            }
        });
    }
    async function deleteschizophreniaStatsPerYear(country, year) {
        //borra un recurso concreto
        console.log(`Deleting the resource with ${country} and year ${year}`);
        const res = await fetch(
            API_SCHIZOPHRENIA_STATS + "/" + country + "/" + year,
            { method: "DELETE" }
        ).then(function (res) {
            if (res.ok) {
                correctMsg = `El dato con país: ${country} y año: ${year} se ha eliminado correctamente.`;
                errorMsg = "";
                console.log("Ok. " + correctMsg);
                getschizophreniaStats(); /*para que el usuario no tenga que recargar la página */
            } else if (res.status == 404) {
                //no data found
                errorMsg = `No se encuentra el dato con país:  ${country} y año: ${year}.`;
                console.log("ERROR. " + errorMsg);
            } else {
                //status == 500
                errorMsg = "No se ha podido acceder a la base de datos.";
                console.log("ERROR. " + errorMsg);
            }
        });
    }
</script>

<main>
    <h3>Datos de esquizofrenia</h3>
    <div style="text-align:right; width:1470px">
            
                
        {#if chargedData}
            <Button
             style="font-size: 16px;border-radius: 4px;background-color: info;"
                outline color="btn btn-info"
                on:click={loadschizophreniaStats}>Cargar datos iniciales
    </Button>
        {:else}
            <Button style="background-color: crimson;" on:click={loadschizophreniaStats}>
                Cargar datos iniciales</Button>
        {/if}
        <Button style="font-size: 16px;border-radius: 4px;background-color: danger;"
            outline on:click={deleteschizophreniaStats} color="btn btn-danger"
        >Eliminar datos</Button>
    
    </div>

    {#if schizophreniaStats.length != 0}
        <br />
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Media de Hombres con esquizofrenia</th>
                    <th>Media de Mujeres con esquizofrenia</th>
                    <th>Media de Población con esquizofrenia</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td
                        ><input
                            placeholder="Ej. Valencia"
                            bind:value={newData.country}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="Ej. 2008"
                            bind:value={newData.year}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={newData["schizophrenia_men"]}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={newData["schizophrenia_women"]}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={newData["schizophrenia_population"]}
                        /></td
                    >
                    <td
                        ><Button
                            outline
                            color="primary"
                            on:click={insertschizophreniaStats}
                        >
                            Insertar</Button
                        ></td
                    >
                </tr>
                {#each schizophreniaStats as stat}
                    <tr>
                        <td>{stat.country}</td>
                        <td>{stat.year}</td>
                        <td>{stat["schizophrenia_men"]}</td>
                        <td>{stat["schizophrenia_women"]}</td>
                        <td>{stat["schizophrenia_population"]}</td>
                        <td>
                            <a href="#/schizophrenia-stats/{stat.country}/{stat.year}">
                            <Button
                                style="margin-right: 10px;"
                                color="primary"
                                on:click={() =>
                                    loadschizophreniaStats(stat.country, stat.year)}
                                >Editar
                            </Button>
                            </a>
                            <br>
                            <Button
                                outline
                                style="margin-right: 10px;"
                                color="danger"
                                on:click={() =>
                                    deleteschizophreniaStatsPerYear(stat.country, stat.year)}
                            >Borrar
                            </Button>
                            
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
        <Button style="background-color:darkgray " on:click={pop}>
            Volver
        </Button>
    {:else}
        <br />
        <p style="text-align: center; background-color: antiquewhite;">
            Para ver los datos pulse el botón.
        </p>

        <Button style="background-color:darkgray" on:click={pop}>Volver</Button>
    {/if}

    {#if errorMsg}
        <p style="color: red; text-align:center; font-size: 20px;">
            ERROR: {errorMsg}
        </p>
    {/if}

    {#if correctMsg}
        <p style="color: green; text-align:center; font-size: 20px;">
            {correctMsg}
        </p>
    {/if}
</main>

<style>
    a {
        font-size: 18px;
        background-color: rgb(74, 98, 248);
        color: white;
        border-radius: 6px;
        border: 1px solid rgb(32, 31, 31);
        padding: 4px;
    }
    a:hover {
        color: white;
    }
</style>