<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";
    const API_SCHIZOPHRENIA_STATS = "/api/v2/schizophrenia-stats"; //tiene que llamar a la API para tratar los datos
    export let params = {};
    let schizophreniaStat = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedSchizophreniaMen = 0.0;
    let updatedSchizophreniaWomen = 0.0;
    let updatedSchizophreniaPopulation = 0.0;
    let errorMsg = "";
    let correctMsg = "";
    onMount(getschizophreniaStat);
    async function getschizophreniaStat() {
        console.log("Fetching data...");
        const res = await fetch(
            API_SCHIZOPHRENIA_STATS + "/" + params.country + "/" + params.year
        );
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            schizophreniaStat = json;
            updatedCountry =schizophreniaStat.country;
            updatedYear = schizophreniaStat.year;
            updatedSchizophreniaMen = schizophreniaStat["schizophrenia_men"];
            updatedSchizophreniaWomen = schizophreniaStat["schizophrenia_women"];
            updatedSchizophreniaPopulation = schizophreniaStat["schizophrenia_population"];
            console.log("Received data.");
        } else if (res.status == 404) {
            errorMsg = "No se encuentra el dato a editar.";
            console.log("ERROR. " + errorMsg);
        } else {
            //res.status ===500)
            errorMsg = "No se ha podido acceder a la base de datos";
            console.log("ERROR. " + errorMsg);
        }
    }
    async function updateschizophreniaStat() {
        console.log("Updating data..." + params.country + " " + params.year);
        const res = await fetch(
            API_SCHIZOPHRENIA_STATS + "/" + params.country + "/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                    country: params.country,
                    year: parseInt(params.year),
                    schizophrenia_men: updatedSchizophreniaMen,
                    schizophrenia_women: updatedSchizophreniaWomen,
                    schizophrenia_population: updatedSchizophreniaPopulation,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(function (res) {
            if (res.ok) {
                console.log("Ok. ");
                errorMsg = "";
                correctMsg = `El dato con país: ${params.country} y año: ${params.year} ha sido actualizado correctamente.`;
                getsmokingStat();
            } else if (res.status == 404) {
                errorMsg = "El dato que intenta editar no existe.";
            } else if (res.status == 500) {
                errorMsg = "Error accediendo a la base de datos.";
            }
        });
    }
</script>

<main>
    <h2>Editar dato</h2>
    <div id="update">
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Índice de esquizofrenia por hombre</th>
                    <th>Índice de esquizofrenia por mujer</th>
                    <th>Índice de esquizofrenia en población</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedSchizophreniaMen}
                        />
                    </td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedSchizophreniaWomen}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedSchizophreniaPopulation}
                        />
                    </td>
                    <td>
                        <Button
                            color="primary"
                            on:click={() => updateschizophreniaStat()}
                        >
                            Actualizar
                        </Button></td
                    >
                </tr>
            </tbody>
        </Table>
        <Button style="background-color:darkgray" on:click={pop}>Volver</Button>
    </div>

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
    h2 {
        text-align: center;
        margin-top: 2%;
    }
    div {
        margin-top: 5%;
        margin-left: 50px;
        margin-right: 50px;
    }
</style>