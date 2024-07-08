import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetail.css';

const CharacterDetail = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PUBLIC_KEY = 'b96a6acec29a60984b77eec6325b103f';
  const HASH = '2d8caf72dd1e5437a9f2e7f70b0645f9';
  const API_URL = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        if (response.data.data.results.length === 0) {
          navigate('/not-found'); // Redirect to NotFound component if no character found
        } else {
          setCharacter(response.data.data.results[0]);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch character details');
      } finally {
        setLoading(false);
      }
    };
    if (characterId) {
      fetchCharacter();
    }
  }, [characterId, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!character) {
    return <p>No character found.</p>;
  }

  return (
    <div className="character-detail">
      <div className="character-detail-header">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <h1>{character.name}</h1>
      </div>
      <p>{character.description}</p>
      <h2>Comics</h2>
      <ul>
        {character.comics.items.map((comic) => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;

