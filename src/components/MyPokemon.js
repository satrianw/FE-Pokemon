import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Mypokemon = ({ pokemon }) => {
  const [rename, setRename] = useState(false);
  const [release, setRelease] = useState(false);
  const [unrelease, setUnrelease] = useState(false);
  const [randomNum, setRandomNum] = useState();

  const renameClose = () => {
    renamePokemon(pokemon.id);
  };
  const renameShow = () => setRename(true);

  const releaseClose = () => {
    releasePokemon(pokemon.id);
  };
  const unreleaseClose = () => setUnrelease(false);

  const number = () => {
    setRandomNum(Math.floor(Math.random() * 20));
    console.log(randomNum);
    if (randomNum === 1 || randomNum === 0 || randomNum === 2) {
      setRelease(true);
    } else if (randomNum > 1) {
      for (let i = 2; i < randomNum; i++) {
        if (randomNum % i == 0) {
          setUnrelease(true);
          break;
        } else {
          setRelease(true);
          break;
        }
      }
    }
  };

  const releasePokemon = async (id) => {
    await axios.delete(`http://localhost:3002/delete/${id}`)
    .then(res => {
        console.log(res.data)
        refreshPage()
    });
  };

  const renamePokemon = async (id) => {
    await axios.put(`http://localhost:3002/update/${id}`)
    .then(res => {
        console.log(res.data)
        refreshPage()
    });
  };

  const refreshPage = () => window.location.reload(false);

  return (
    <>
      <Card
        className="my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white rounded"
        style={{ border: "none" }}
      >
        <Link to={`/mypokemon/${pokemon.pokemon_id}`}>
          <Card.Img
            style={{ width: "8rem" }}
            src={pokemon.pokemon_front_default}
            variant="top"
          />
        </Link>
        <Card.Body
          className={`${pokemon.pokemon_type_name} rounded text-white`}
        >
          <Link to={`/mypokemon/${pokemon.pokemon_id}`} className="link-name">
            <Card.Title as="div">
              <strong>
                #{pokemon.pokemon_id}{" "}
                {pokemon.pokemon_name.charAt(0).toUpperCase() +
                  pokemon.pokemon_name.slice(1)}
              </strong>
            </Card.Title>
          </Link>
        </Card.Body>
        <Card.Body className={`rounded text-white`}>
          <Button onClick={renameShow} variant="primary">
            Rename
          </Button>
          <Button onClick={number} variant="danger">
            Release
          </Button>
        </Card.Body>
      </Card>
      <Modal show={rename} onHide={renameClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Pokemon Rename</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Pokemen Renamed</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={renameClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={release} onHide={releaseClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Pokemon Release</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Pokemon Realeased!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={releaseClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={unrelease} onHide={unreleaseClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Pokemon Release</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Pokemon Doesn't Want to Go!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={unreleaseClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Mypokemon;
