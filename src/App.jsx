import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Route, Routes, NavLink } from 'react-router-dom';
import CharacterList from './assets/Components/CharacterList';
import CharacterDetail from './assets/Components/CharacterDetail';
import Home from './assets/Components/Home';
import Comics from './assets/Components/Comics';
import NotFound from './assets/Components/NotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <ColorSchemesExample />

      <Container fluid className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-characters" element={<CharacterList />} />
          <Route path="/character-details/:characterId" element={<CharacterDetail />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

function ColorSchemesExample() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">Comic Book Library</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" end>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/browse-characters">
            Browse Characters
          </Nav.Link>
          <Nav.Link as={NavLink} to="/comics">
            Comics
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default App;



