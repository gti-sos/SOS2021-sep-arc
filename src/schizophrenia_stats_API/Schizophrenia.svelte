<script>
    import { Button, Table } from "sveltestrap";
    const API_SCHIZOPHRENIA_STATS = "/api/v1/schizophrenia_stats";
    let dataCharged = false;
    let schizophreniastats = [];
    async function loadStats() {
        console.log("Loading data...");
        const cargaDeDatos = await fetch(API_SCHIZOPHRENIA_STATS + "/loadInitialData");
        console.log("problems");
        dataCharged = true;
        if (cargaDeDatos.status) {
            console.log("Ok.");
            const res = await fetch(API_SCHIZOPHRENIA_STATS);
            if (res.ok) {
                console.log("Ok. Obtaining data...");
                const json = await res.json();
                schizophreniastats = json;
                console.log("Received ${schizophreniastats.length} schizophrenia stats.");
            } else {
                console.log("Error, there is no data.");
            }
        } else {
            console.log("Error loading data.");
        }
    }
    async function deleteStats() {
        console.log("Deleting schizophrenia_stats...");
        dataCharged = false;
        const res = await fetch(API_SCHIZOPHRENIA_STATS, {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("Ok.");
                schizophreniastats = [];
            } else if (res.status == 404) {
                console.log("No data found");
            } else {
                console.log("Error deleting DB stats");
            }
        });
    }
</script>

<main>
    <div>
        {#if dataCharged}
            <Button style="background-color: darkgreen;" disabled>
                Cargar datos base</Button
            >
        {:else}
            <Button style="background-color: darkgreen;" on:click={loadStats}>
                Carga de datos</Button
            >
        {/if}
        <Button style="background-color: darkgray" on:click={deleteStats}>
            Elimininación de datos</Button
        >
    </div>

    {#if schizophreniastats.length != 0}
        <br />
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Media de Hombres con esquizofrenia</th>
                    <th>Media de Mujeres con esquizofrenia</th>
                    <th>Media de Poblacion con esquizofrenia</th>
                </tr>
            </thead>
            <tbody>
                {#each schizophreniastats as stat}
                    <tr>
                        <td>{stat.country}</td>
                        <td>{stat.year}</td>
                        <td>{stat["schizophrenia_men"]}</td>
                        <td>{stat["schizophrenia_women"]}</td>
                        <td>{stat["schizophrenia_population"]}</td>
                    </tr>
                {/each}
            </tbody>
        </Table>
        <a href="/">Página Principal</a>
    {:else}
        <br />
        <p style="text-align: center; background-color: antiquewhite;">
            Si desea ver los datos presione el botón.
        </p>
        <a href="/">Página Principal</a>
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