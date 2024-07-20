import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=afbe17fe`);
        setMovies(response.data.Search);
    };

    if (searchTerm) {
      fetchMovies();
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.searchTerm.value);
  };

  return (
    <Container className="container-center">
      <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
        <Form.Control type="text" placeholder="Search for a movie" name="searchTerm" />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      
        <Row className="d-flex flex-wrap justify-content-center">
          {movies && movies.map((movie) => (
            <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="movie-card">
                <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Year}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      
    </Container>
  );
};

export default App;