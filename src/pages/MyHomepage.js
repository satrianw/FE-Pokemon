import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

// Components
import MyPokemon from "../components/MyPokemon";
import Loader from "../components/Loader";

const Homepage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPokemonList = async () => {
    let pokemonArray = [];
    const length = await getPokemonDataLength();
    for (let i = 1; i <= length.data.length; i++) {
      const pokemon = await getPokemonData(i);
      if (pokemon.data !== null) {
        pokemonArray.push(pokemon.data);
      } else {
        continue;
      }
    }
    console.log(pokemonArray);
    setPokemon(pokemonArray);
    setLoading(false);
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`http://localhost:3002/list/${id}`);
    return res;
  };

  const getPokemonDataLength = async () => {
    const res = await axios.get(`http://localhost:3002/list/`);
    return res;
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {pokemon.map((p) => (
            <Col key={p.id} xs={12} sm={12} md={4} lg={4} xl={4}>
              <MyPokemon pokemon={p} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homepage;
