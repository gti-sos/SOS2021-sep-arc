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

        <h1>Integrations</h1>
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
                            <a href="/#/integrations/Pobreza">
                                <Button color="dark">Integración externa de Pobreza</Button>
                            </a>
                        </div>
                        <br />
                        <div>
                            <a
                                href="/#/integrations/Covid19"
                            >
                                <Button color="dark">Integración externa Covid-19</Button>
                            </a>
                        </div>
                        <br />
                        <div>
                            <a href="/#/integrations/Employment">
                                <Button color="success"
                                    >Integración interna Children Employment</Button
                                >
                            </a>
                        </div>
                        <br />
                        <div>
                            <a
                                href="/#/integrations/ChildrenSchool"
                            >
                                <Button color="success"
                                    >Integración interna Children School</Button
                                >
                            </a>
                        </div>
                        <br />
                        <div>
                            <a href="/#/integrations/ChildrenVIH">
                                <Button color="success"
                                    >Integración interna Children with VIH</Button
                                >
                            </a>
                        </div>
                        <br />
                        <div>
                            <a
                                href="/#/integrations/Sanity"
                            >
                                <Button color="success"
                                    >Integración interna Sanity</Button
                                >
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
    