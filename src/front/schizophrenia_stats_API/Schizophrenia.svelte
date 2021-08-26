<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";
    import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
    let schizophrenia = [];
    let newSchizophrenia = {
        country: "",
        year: "",
        schizophrenia_men: 0.0,
        schizophrenia_women: 0.0,
        schizophrenia_population: 0.0,
    };
    let countries = [];
    let years = [];

    let actualCountry = "";
    let actualYear = "";

    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;
    let okMsg = false;
    let errorMsg = false;

    onMount(getschizophreniaCountryYear);
    onMount(getschizophrenia);
    //GET
    async function getschizophreniaCountryYear() {
        const res = await fetch("/api/v2/schizophrenia-stats");
        if (res.ok) {
            //PAIS
            const json = await res.json();
            countries = json.map((c) => {
                return c.country;
            });
            countries = Array.from(new Set(countries));
            //AÑO
            years = json.map((c) => {
                return c.year;
            });
            years = Array.from(new Set(years));
        } else {
            console.log("ERROR");
        }
    }
    async function getschizophrenia() {
        console.log("Fetching schizophrenia-stats...");
        const res = await fetch(
            "/api/v2/schizophrenia-stats?offset=" +
                elementPage * offset +
                "&limit=" +
                elementPage
        );
        const nextPage = await fetch(
            "/api/v2/schizophrenia-stats?offset=" +
                elementPage * (offset + 1) +
                "&limit=" +
                elementPage
        );
        if (res.ok && nextPage.ok) {
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            schizophrenia = json;
            if (jsonNext.length == 0) {
                moreData = false;
            } else {
                moreData = true;
            }
        } else {
            console.log("ERROR");
        }
    }
    //POST
    async function insertschizophrenia() {
        console.log(
            "Insertando schizophrenia-stats..." +
                JSON.stringify(newSchizophrenia)
        );
        if (
            isNaN(newSchizophrenia.year) ||
            isNaN(newSchizophrenia.schizophrenia_men) ||
            isNaN(newSchizophrenia.schizophrenia_women) ||
            isNaN(newSchizophrenia.schizophrenia_population) ||
            newSchizophrenia.country === "" ||
            newSchizophrenia.year === ""
        ) {
            console.log("Uno o más datos NO son numéricos");
            okMsg = false;
            errorMsg =
                "No puede introducir campos en blanco o campos que no sean numéricos";
        } else {
            const res = await fetch("/api/v2/schizophrenia-stats", {
                method: "POST",
                body: JSON.stringify(newSchizophrenia),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    getschizophrenia();
                    okMsg = "Dato introducido de forma exitosa";
                    errorMsg = false;
                } else {
                    okMsg = false;
                    errorMsg =
                        "No puede introducirse un dato con mismo año y país debido a que ya existe uno en la base de datos";
                }
            });
        }
    }
    //DELETE
    async function deleteschizophrenia(country, year) {
        const res = await fetch(
            "/api/v2/schizophrenia-stats/" + country + "/" + year,
            {
                method: "DELETE",
            }
        ).then(function (res) {
            getschizophrenia();
            getschizophreniaCountryYear();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;
    }
    async function deleteschizophreniaData() {
        const res = await fetch("/api/v2/schizophrenia-stats", {
            method: "DELETE",
        }).then(function (res) {
            getschizophrenia();
            getschizophreniaCountryYear();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }
    //LOAD INITIAL DATA
    async function loadInitialDataschizophrenia() {
        const res = await fetch(
            "/api/v2/schizophrenia-stats/loadInitialData"
        ).then(function (res) {
            getschizophrenia();
        });
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
    }
    //BÚSQUEDA
    async function searchschizophrenia(country, year) {
        var url = "/api/v2/schizophrenia-stats";
        if (country != "" && year != "") {
            url = url + "?year=" + year + "&country=" + country;
        } else if (country != "" && year == "") {
            url = url + "?country=" + country;
        } else if (country == "" && year != "") {
            url = url + "?year=" + year;
        }
        const res = await fetch(url);
        if (res.ok) {
            const json = await res.json();
            schizophrenia = json;
            if (schizophrenia.length > 0) {
                okMsg = "Se ha encontrado uno o varios resultados";
                errorMsg = false;
            } else {
                okMsg = false;
                errorMsg = "No se ha obtenido ningún resultado";
            }
        } else {
            console.log("ERROR");
        }
    }
    async function addOffSet(inc) {
        offset += inc;
        actualPage += inc;
        getschizophrenia();
    }
</script>

<main>
    <h1 style="text-align: center">Datos de esquizofrenia.</h1>
    {#await schizophrenia}
        Loading schizophrenia stats...
    {:then schizophrenia}
        <div style="text-align:right; width:1480px">
            <Button
                style="font-size: 16px;border-radius: 4px;background-color: info;"
                outline
                color="btn btn-info"
                on:click={loadInitialDataschizophrenia}
                >Cargar datos iniciales
            </Button>
            <Button
                style="font-size: 16px;border-radius: 4px;background-color: danger;"
                outline
                on:click={deleteschizophreniaData}
                color="btn btn-danger"
            >
                Borrar todo
            </Button>
        </div>
        <br />

        <Table bordered>
            <thead style="background:white;color:black;text-align:center;">
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Índice de esquizofrenia por hombre</th>
                    <th>Índice de esquizofrenia por mujer</th>
                    <th>Índice de esquizofrenia en población</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody style="background:white;color:black;text-align:center;">
                <tr>
                    <td>
                        <Input
                            type="text"
                            placeholder="Introduzca un país"
                            bind:value={newSchizophrenia.country}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Introduzca un año"
                            bind:value={newSchizophrenia.year}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newSchizophrenia.schizophrenia_men}
                        />
                    </td>
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newSchizophrenia.schizophrenia_women}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newSchizophrenia.schizophrenia_population}
                        /></td
                    >
                    <td>
                        <Button
                            outline
                            color="primary"
                            on:click={insertschizophrenia}
                        >
                            Insertar
                        </Button>
                    </td>
                </tr>

                {#each schizophrenia as schizophreniaStat}
                    <tr>
                        <td>
                            <a
                                href="#/schizophrenia-stats/{schizophreniaStat.country}/{schizophreniaStat.year}"
                            >
                                {schizophreniaStat.country}
                            </a>
                        </td>
                        <td> {schizophreniaStat.year} </td>
                        <td> {schizophreniaStat.schizophrenia_men} </td>
                        <td> {schizophreniaStat.schizophrenia_women} </td>
                        <td> {schizophreniaStat.schizophrenia_population} </td>
                        <td>
                            <Button
                                outline
                                color="danger"
                                on:click={deleteschizophrenia(
                                    schizophreniaStat.country,
                                    schizophreniaStat.year
                                )}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-trash"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                </svg>
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/await}

    <br />

    <div class="col-md-2">
        <FormGroup>
            <Label for="selectCountry">Búsqueda por país</Label>
            <Input
                name="selectCountry"
                id="selectCountry"
                bind:value={actualCountry}
            >
                {#each countries as country}
                    <option>{country}</option>
                {/each}
                <option>-</option>
            </Input>
        </FormGroup>
    </div>
    <div class="col-md-2">
        <FormGroup>
            <Label for="selectYear">Búsqueda por año</Label>
            <Input name="selectYear" id="selectYear" bind:value={actualYear}>
                {#each years as year}
                    <option>{year}</option>
                {/each}
                <option>-</option>
            </Input>
        </FormGroup>
    </div>

    <div style="text-align:left;">
        <br />
        <button
            outline
            style="font-size: 16px;border-radius: 4px;background-color: secondary;"
            color="secondary"
            on:click={searchschizophrenia(actualCountry, actualYear)}
            class="btn btn-outline-secondary">Buscar</button
        >
    </div>
    <br />
    <Pagination style="float:right;" ariaLabel="Cambio de página">
        <PaginationItem class={actualPage === 1 ? "disabled" : ""}>
            <PaginationLink
                previous
                href="#/schizophrenia-stats"
                on:click={() => addOffSet(-1)}
            />
        </PaginationItem>

        {#if actualPage != 1}
            <PaginationItem>
                <PaginationLink
                    href="#/schizophrenia-stats"
                    on:click={() => addOffSet(-1)}
                    >{actualPage - 1}</PaginationLink
                >
            </PaginationItem>
        {/if}
        <PaginationItem active>
            <PaginationLink href="#/schizophrenia-stats"
                >{actualPage}</PaginationLink
            >
        </PaginationItem>

        {#if moreData}
            <PaginationItem>
                <PaginationLink
                    href="#/schizophrenia-stats"
                    on:click={() => addOffSet(1)}
                    >{actualPage + 1}</PaginationLink
                >
            </PaginationItem>
        {/if}

        <PaginationItem class={moreData ? "" : "disabled"}>
            <PaginationLink
                next
                href="#/schizophrenia-stats"
                on:click={() => addOffSet(1)}
            />
        </PaginationItem>
    </Pagination>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
        <p style="color: green">ÉXITO: {okMsg}</p>
    {/if}

    <Button
        style="font-size: 16px;border-radius: 4px; float:center;"
        outline
        color="secondary"
        on:click={pop}
        >Atrás
    </Button>
</main>
