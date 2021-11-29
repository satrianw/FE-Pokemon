import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="danger" variant='dark' expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img
                                src="/pokemon.png"
                                width="120"
                                height="50"
                                className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="/home">
                        <Navbar.Brand>My Pokemon</Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
