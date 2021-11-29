import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Pages
import Homepage from './pages/Homepage';
import PokemonPage from './pages/PokemonPage';
import MyPokemonPage from './pages/MyPokemonPage';
import MyHomepage from './pages/MyHomepage';

// Components
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header/>
      <Container>
        <Route exact path='/' component={Homepage} />
        <Route path='/pokemon/:id' component={PokemonPage}/>
        <Route path='/home' component={MyHomepage}/>
        <Route path='/mypokemon/:id' component={MyPokemonPage}/>
      </Container>
    </Router>
  );
}

export default App;
