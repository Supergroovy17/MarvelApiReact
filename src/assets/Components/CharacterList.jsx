import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const PUBLIC_KEY = 'b96a6acec29a60984b77eec6325b103f';
  const HASH = '2d8caf72dd1e5437a9f2e7f70b0645f9';
  const API_URL = 'https://gateway.marvel.com/v1/public/characters';

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery.trim() !== '') {
          // Check if the searchQuery is a number (for ID search)
          if (!isNaN(searchQuery)) {
            response = await axios.get(`${API_URL}/${searchQuery}`, {
              params: {
                ts: 1,
                apikey: PUBLIC_KEY,
                hash: HASH,
              },
            });
            if (response.data.data.results.length === 0) {
              navigate('/not-found');
            } else {
              setCharacters([response.data.data.results[0]]);
            }
          } else {
            response = await axios.get(API_URL, {
              params: {
                ts: 1,
                apikey: PUBLIC_KEY,
                hash: HASH,
                nameStartsWith: searchQuery,
              },
            });
            if (response.data.data.results.length === 0) {
              navigate('/not-found');
            } else {
              setCharacters(response.data.data.results);
            }
          }
        } else {
          // Fetch all characters if no search query
          response = await axios.get(API_URL, {
            params: {
              ts: 1,
              apikey: PUBLIC_KEY,
              hash: HASH,
            },
          });
          setCharacters(response.data.data.results);
        }
        setError(null);
      } catch (err) {
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchQuery, navigate]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="character-list">
      <Navbar searchQuery={searchQuery} onInputChange={handleInputChange} />
      <div className="character-cards">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <Link to={`/character-details/${character.id}`} className="character-card-link">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <h3>{character.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const Navbar = ({ searchQuery, onInputChange }) => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-center">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search characters by name or ID..."
            aria-label="Search"
            value={searchQuery}
            onChange={onInputChange}
          />
        </form>
      </div>
    </nav>
  );
};

export default CharacterList;

