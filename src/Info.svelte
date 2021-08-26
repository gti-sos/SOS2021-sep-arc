<script>
    import {
        Button,
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
        Col,
        Container,
        Nav,
        NavItem,
        NavLink,
        Row,
    } from "sveltestrap";
</script>

<main>
    <Container>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>schizophrenia_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Estadísticas acerca de los datos recogidos por
                        esquizofrenia en las comunidades autónomas de España.</CardText
                    >
                    <div>
                        <a href="https://github.com/anaromero99">
                            <Button color="warning">Github</Button>
                        </a>
                    </div>
                    <br />
                    <div>
                        <a
                            href="https://sos2021-sep-arc.herokuapp.com/api/v2/schizophrenia-stats"
                        >
                            <Button color="info">API v2</Button>
                        </a>
                    </div>
                    <br />
                    <div>
                        <a href="/#/schizophrenia-stats">
                            <Button color="info"
                                >Interfaz de Esquizofrenia</Button
                            >
                        </a>
                    </div>
                    <br />
                    <div>
                        <a
                            href="https://documenter.getpostman.com/view/14948110/TzsZroMB"
                        >
                            <Button color="info"
                                >Documentación Postman v2</Button
                            >
                        </a>
                    </div>
                </CardBody>
                <CardFooter
                    >desarrollado por
                    <a href="https://github.com/anaromero99"
                        >Ana Romero Cáceres</a
                    >
                </CardFooter>
            </Card>
        </Col>
    </Container>

    <Nav>
        <NavItem>
            <NavLink href="/">Volver a la página principal</NavLink>
        </NavItem>
    </Nav>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        color: #0d497e;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
