import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Components
import Loader from '../components/Loader';

const MyPokemonPage = ({ match }) => {

    const [pokemonDetails, setPokemonDetails] = useState();
    const [loading, setLoading] = useState(true);

    const id = match.params.id;

    const getPokemon = async (id) => {
        const details = await getPokemonData(id);
        setPokemonDetails(details.data);
        console.log(details.data)
        setLoading(false);
    }

    const getPokemonData = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    useEffect(() => {
        getPokemon(id);
    }, [])

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card className='my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white' style={{ border: 'none' }}>
                            <Link to={`/pokemon/${pokemonDetails.id}`}>
                                <Card.Img style={{ width: '15rem' }} src={pokemonDetails.sprites.front_default} variant='top'/>
                            </Link>
                            <Card.Body className={`${pokemonDetails.types[0].type.name} rounded text-black`}>
                                <Col>
                                    <Card.Title as='div'>
                                        <strong>#{pokemonDetails.id} {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</strong>
                                    </Card.Title>
                                    <Row>
                                        {pokemonDetails.types.map(t => (
                                            <Col key={t.type.name}>
                                                <div className={`${t.type.name} rounded px-4 py-1`} style={{ color: 'black', border: '1px solid' }}>
                                                    {t.type.name.toUpperCase()}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row className='mt-4'>
                                        <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className='px-4 py-1 rounded' style={{ border: '1px black solid' }}>Abilities</div>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        {pokemonDetails.abilities.map(a => (
                                            <Col key={a.ability.name} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className={`rounded px-4 py-1`}>
                                                    {a.ability.name.toUpperCase()}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Card.Body>
                            <Card.Body className={`rounded text-black`}>
                                <Col>
                                    <Row className='mt-4'>
                                        <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className='px-4 py-1 rounded' style={{ border: '1px black solid' }}>Moves</div>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        {pokemonDetails.moves.map(m => (
                                            <Col key={m.move.name} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className={`rounded px-4 py-1`}>
                                                    {m.move.name.toUpperCase()}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default MyPokemonPage;
