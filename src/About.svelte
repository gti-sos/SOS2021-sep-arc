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
    <br/>
    <Container>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>schizophrenia_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Vídeo explicativo acerca de los datos recogidos por
                        esquizofrenia en las comunidades autónomas de España.</CardText
                    >
                    <div>
                        <a href="https://youtu.be/F3nxusX54jA">
                            <Button color="danger">Clique aquí</Button>
                        </a>
                    </div>
                    <br />
                    
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
    <br/>
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
        color: rgb(14, 90, 69);
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
